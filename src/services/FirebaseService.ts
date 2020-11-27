/* eslint-disable implicit-arrow-linebreak */
import firebase from 'firebase/app'

import log from '../logger'
/**
 *
 * @param {*} param0
 */
export const getAll = ({ collection }: any) => {
    const currentUserId = firebase.auth()?.currentUser?.uid
    const collectionRef = firebase.firestore().collection(collection)

    const results: any = []

    return collectionRef
        .where('owner', '==', currentUserId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                results.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            return results
        })
        .catch((error) => {
            log.error('Error getting documents: ', error)
            return error
        })
}

export const getByRef = (_documentRef: any) =>
    _documentRef
        .get()
        .then((doc: any) => {
            if (doc.exists) {
                return { ...doc.data(), id: _documentRef.id }
            }
            // doc.data() will be undefined in this case
            log.info('No such document!')
            return null
        })
        .catch((error: any) => {
            log.error('Error getting document:', error)
            return error
        })
/**
 *
 * @param {*} _collection - name of collection to add object to
 * @param {*} _objectData - data to add to the collection
 */
export const addObjectToCollection = ({ collection, objectData }: any) => {
    const currentUserId = firebase.auth()?.currentUser?.uid
    const collectionRef = firebase.firestore().collection(collection)

    return collectionRef
        .add({
            owner: currentUserId,
            content: { ...objectData },
            created: new Date().getTime(),
            updated: new Date().getTime(),
        })
        .then(
            async (doc) => {
                log.debug(`addObjectToCollection ${collection} ${doc}`)

                const docData = await getByRef(doc)
                return docData
            },
            (error) => {
                log.error(`ERROR: addObjectToCollection ${collection} ${error}`)
                return error
            }
        )
        .catch((e) => {
            log.error(`ERROR: addObjectToCollection ${collection} ${e}`)
            return e
        })
}

/**
 *
 * @param {*} collection - name of collection
 * @param {*} objectId - id of data to remove from the collection
 */
export const removeObjectFromCollection = ({ collection, objectId }: any) => {
    const collectionRef = firebase.firestore().collection(collection)

    return collectionRef
        .doc(objectId)
        .delete()
        .then(
            async (doc) => {
                log.debug(`removeObjectFromCollection ${collection} ${objectId}`)
                return true
            },
            (error) => {
                log.error(`ERROR: removeObjectFromCollection ${collection} ${error}`)
                return error
            }
        )
        .catch((e) => {
            log.error(`ERROR: removeObjectFromCollection ${collection} ${e}`)
            return e
        })
}

/**
 *
 * @param {*} blob
 */
export const uploadImage = (blob: any) =>
    new Promise((resolve, reject) => {
        const currentUserId = firebase.auth()?.currentUser?.uid
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
