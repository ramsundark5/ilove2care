import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
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
