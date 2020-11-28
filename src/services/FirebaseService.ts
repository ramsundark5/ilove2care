/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import { convertTimestamps } from '../helpers/FirebaseHelper'
import log from '../logger'

export default class FirebaseService {
    db: firebase.firestore.Firestore

    auth: firebase.auth.Auth

    constructor() {
        this.db = firebase.firestore()
        this.auth = firebase.auth()
    }

    getCurrentUser = () => this.auth.currentUser

    getCurrentUserId = () => this.auth.currentUser?.uid

    /**
     *
     * @param {*} param0
     */
    getAll = async ({ collection }: any) => {
        const currentUserId = this.getCurrentUserId()
        if (!currentUserId) {
            return []
        }

        const results: any = []
        try {
            const collectionRef = this.db.collection(collection)
            const querySnapshot = await collectionRef.where('userId', '==', currentUserId).get()
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                results.push({
                    id: doc.id,
                    ...convertTimestamps(doc.data()),
                })
            })
            return results
        } catch (error) {
            log.error(`Error getting documents for ${collection} ${error}`)
            return []
        }
    }

    /* getById = async (docId: string) => {
        try {
            const collectionRef = this.db.collection(collection)
            const doc: any = await collectionRef.get()
            if (doc.exists) {
                return { id: _documentRef.id, ...doc.data() }
            }
            log.info('No such document!')
            return null
        } catch (error: any) {
            log.error('Error getting document :', error)
            return error
        }
    } */

    /**
     *
     * @param {*} _collection - name of collection to add object to
     * @param {*} _objectData - data to add to the collection
     */
    saveObjectToCollection = async ({ collection, objectData }: any) => {
        const currentUserId = this.getCurrentUserId()
        const collectionRef = this.db.collection(collection)
        if (!currentUserId) {
            return
        }
        try {
            await collectionRef.doc(...objectData.id).set({ ...objectData }, { merge: true })
        } catch (error) {
            log.error(`ERROR: addObjectToCollection ${collection} ${error}`)
        }
    }

    /**
     *
     * @param {*} collection - name of collection
     * @param {*} objectId - id of data to remove from the collection
     */
    removeObjectFromCollection = async ({ collection, objectId }: any) => {
        const collectionRef = this.db.collection(collection)
        try {
            await collectionRef.doc(objectId).delete()
            return true
        } catch (error) {
            log.error(`ERROR: removeObjectFromCollection ${collection} ${error}`)
            return error
        }
    }

    /**
     *
     * @param {*} blob
     */
    uploadImage = (blob: any) =>
        // eslint-disable-next-line consistent-return
        new Promise((resolve, reject) => {
            const currentUserId = this.getCurrentUserId()
            if (!currentUserId) {
                return reject(new Error('Authenticated user not found'))
            }
            const ref = firebase
                .storage()
                .ref(currentUserId)
                .child(`${new Date().getTime()}-${currentUserId}.jpeg`)

            const task = ref.put(blob)

            task.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => log.trace((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
                (error) => {
                    log.error('error uploading file ', error)
                    return reject(error)
                },
                () =>
                    resolve({
                        url: task.snapshot.downloadURL,
                        contentType: task.snapshot.metadata.contentType,
                        name: task.snapshot.metadata.name,
                        size: task.snapshot.metadata.size,
                    })
            )
        })
}
