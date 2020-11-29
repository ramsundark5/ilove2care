import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import { convertTimestamps } from '../../../helpers/FirebaseHelper'
import log from '../../../logger'
import FirebaseService from '../../../services/FirebaseService'
import { IProject } from '../models/IProject'

export default class ProjectDao {
    db: firebase.firestore.Firestore

    auth: firebase.auth.Auth

    firebaseService: FirebaseService

    constructor() {
        this.db = firebase.firestore()
        this.auth = firebase.auth()
        this.firebaseService = new FirebaseService()
    }

    getCollectionRef = () => {
        const collectionRef = this.db.collection('projects')
        return collectionRef
    }

    getAll = async () => {
        const results: IProject[] = []
        // const currentUserId = this.firebaseService.getCurrentUserId()
        try {
            const querySnapshot = await this.getCollectionRef()
                // .where('userId', '==', currentUserId)
                .get()
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                results.push({
                    id: doc.id,
                    ...convertTimestamps(doc.data()),
                })
            })
            log.info('loaded projects list into store')
            return results
        } catch (error) {
            log.error(`Error getting project list ${error}`)
            return []
        }
    }
}
