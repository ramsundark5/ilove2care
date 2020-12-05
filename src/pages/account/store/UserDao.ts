import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import { convertTimestamps } from '../../../helpers/FirebaseHelper'
import log from '../../../logger'
import FirebaseService from '../../../services/FirebaseService'
import { IUser } from '../models/IUser'

export default class UserDao {
    db: firebase.firestore.Firestore

    auth: firebase.auth.Auth

    firebaseService: FirebaseService

    constructor() {
        this.db = firebase.firestore()
        this.auth = firebase.auth()
        this.firebaseService = new FirebaseService()
    }

    getCollectionRef = () => {
        const currentUserId = this.firebaseService.getCurrentUserId()
        if (!currentUserId) {
            throw new Error('No authenticated user found. Login again')
        }
        const collectionRef = this.db.collection('users').doc(currentUserId)
        return collectionRef
    }

    get = async () => {
        try {
            const doc = await this.getCollectionRef().get()
            const userFromServer = {
                id: doc.id,
                ...convertTimestamps(doc.data()),
            }
            log.info('loaded user into store')
            return userFromServer
        } catch (error) {
            log.error(`Error getting user ${error}`)
            return null
        }
    }

    save = async (user: IUser) => {
        try {
            await this.getCollectionRef().set({ ...user }, { merge: true })
        } catch (error) {
            log.error(`ERROR saving user ${error}`)
        }
    }

    blacklist = async (blocked: boolean) => {
        try {
            await this.getCollectionRef().update({
                blocked,
            })
            return true
        } catch (error) {
            log.error(`ERROR updating blacklist status ${error}`)
            return error
        }
    }
}
