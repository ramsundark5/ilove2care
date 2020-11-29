/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import { convertTimestamps } from '../../../helpers/FirebaseHelper'
import log from '../../../logger'
import FirebaseService from '../../../services/FirebaseService'
import { ITimeEntry } from './timeentry-item-store'

export default class TimesheetService {
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
        const results: any = []
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
            return results
        } catch (error) {
            log.error(`Error getting timesheet documents ${error}`)
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
