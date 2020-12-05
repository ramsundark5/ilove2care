import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import { convertTimestamps } from '../../../helpers/FirebaseHelper'
import log from '../../../logger'
import FirebaseService from '../../../services/FirebaseService'
import { IRole } from '../model/IRole'

export default class AdminDao {
    db: firebase.firestore.Firestore

    auth: firebase.auth.Auth

    firebaseService: FirebaseService

    constructor() {
        this.db = firebase.firestore()
        this.auth = firebase.auth()
        this.firebaseService = new FirebaseService()
    }

    getCollectionRef = () => {
        const collectionRef = this.db.collection('roles')
        return collectionRef
    }

    getAll = async () => {
        const results: IRole[] = []
        try {
            const querySnapshot = await this.getCollectionRef().get()
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                results.push({
                    id: doc.id,
                    ...convertTimestamps(doc.data()),
                })
            })
            log.info('loaded role list into store')
            return results
        } catch (error) {
            log.error(`Error getting role list ${error}`)
            return []
        }
    }

    saveUserRole = async (role: IRole, id: string) => {
        await this.getCollectionRef()
            .doc(id)
            .set({ ...role })
    }

    /* blacklist = async (blocked: boolean) => {
        try {
            await this.getCollectionRef().update({
                blocked,
            })
            return true
        } catch (error) {
            log.error(`ERROR updating blacklist status ${error}`)
            return error
        }
    } */
}
