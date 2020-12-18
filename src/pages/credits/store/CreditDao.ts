import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import { convertTimestamps } from '../../../helpers/FirebaseHelper'
import log from '../../../logger'
import FirebaseService from '../../../services/FirebaseService'
import { ICredit } from '../models/ICredit'

export default class CreditDao {
    db: firebase.firestore.Firestore

    auth: firebase.auth.Auth

    firebaseService: FirebaseService

    constructor() {
        this.db = firebase.firestore()
        this.auth = firebase.auth()
        this.firebaseService = new FirebaseService()
    }

    getCollectionRef = (projectId: string) => {
        const collectionRef = this.db.collection('projects').doc(projectId).collection('credits')
        return collectionRef
    }

    /**
     *
     * @param {*} param0
     */
    getUserCredits = async () => {
        const results: ICredit[] = []
        const userEmail = this.firebaseService.getCurrentUser()?.email || ''
        try {
            const querySnapshot = await this.db
                .collectionGroup('credits')
                .where('users', 'array-contains', userEmail)
                .get()
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                results.push({
                    id: doc.id,
                    ...convertTimestamps(doc.data()),
                })
            })
            log.info('loaded credits list into store')
            return results
        } catch (error) {
            log.error(`Error getting credits list ${error}`)
            return []
        }
    }

    save = async (credit: ICredit) => {
        try {
            await this.getCollectionRef(credit.projectId)
                .doc(credit.id)
                .set({ ...credit }, { merge: true })
        } catch (error) {
            log.error(`ERROR saving credit ${error}`)
        }
    }

    remove = async (projectId: string, creditId: string) => {
        try {
            await this.getCollectionRef(projectId).doc(creditId).delete()
            return true
        } catch (error) {
            log.error(`ERROR deleting credit ${error}`)
            return error
        }
    }
}
