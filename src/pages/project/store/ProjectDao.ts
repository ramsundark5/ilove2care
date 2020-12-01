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
        try {
            const querySnapshot = await this.getCollectionRef()
                .where('status', '!=', 'archived')
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

    save = async (project: IProject) => {
        try {
            await this.getCollectionRef()
                .doc(project.id)
                .set({ ...project }, { merge: true })
        } catch (error) {
            log.error(`ERROR saving project ${error}`)
        }
    }

    archive = async (projectId: string) => {
        try {
            await this.getCollectionRef().doc(projectId).update({
                status: 'archived',
            })
            return true
        } catch (error) {
            log.error(`ERROR deleting project ${error}`)
            return error
        }
    }
}
