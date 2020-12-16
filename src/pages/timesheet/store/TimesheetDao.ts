import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import { convertTimestamps } from '../../../helpers/FirebaseHelper'
import log from '../../../logger'
import FirebaseService from '../../../services/FirebaseService'
import { ITimeEntry } from '../models/ITimeEntry'

export default class TimesheetDao {
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
        const collectionRef = this.db
            .collection('users')
            .doc(currentUserId)
            .collection('timesheets')
        return collectionRef
    }

    /**
     *
     * @param {*} param0
     */
    getAll = async () => {
        const results: ITimeEntry[] = []
        const currentUserId = this.firebaseService.getCurrentUserId()
        try {
            const querySnapshot = await this.getCollectionRef()
                .where('userId', '==', currentUserId)
                .get()
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                results.push({
                    id: doc.id,
                    ...convertTimestamps(doc.data()),
                })
            })
            log.info('loaded timesheet list into store')
            return results
        } catch (error) {
            log.error(`Error getting timesheet list ${error}`)
            return []
        }
    }

    save = async (timeEntry: ITimeEntry) => {
        try {
            await this.getCollectionRef()
                .doc(timeEntry.id)
                .set({ ...timeEntry }, { merge: true })
        } catch (error) {
            log.error(`ERROR saving timeentry ${error}`)
        }
    }

    remove = async (timesheetId: string) => {
        try {
            await this.getCollectionRef().doc(timesheetId).delete()
            return true
        } catch (error) {
            log.error(`ERROR deleting timesheet ${error}`)
            return error
        }
    }
}
