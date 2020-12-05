/* eslint-disable no-param-reassign */
import { makeAutoObservable, runInAction } from 'mobx'

import FirebaseService from '../../../services/FirebaseService'
import { IRole } from '../model/IRole'
import AdminDao from './AdminDao'

export default class AdminStore {
    adminDao: AdminDao

    userRoleList: IRole[] = []

    firebaseService: FirebaseService

    initialized = false

    constructor() {
        makeAutoObservable(this)
        this.adminDao = new AdminDao()
        this.firebaseService = new FirebaseService()
    }

    loadData = async () => {
        const results = await this.adminDao.getAll()
        if (results.length < 1) {
            return false
        }
        runInAction(() => {
            this.userRoleList = results
            this.initialized = true
        })
        return true
    }

    saveUserRole = (userRole: IRole, id: string) => {
        const userRoleToUpdate = this.userRoleList.find((indexEntry) => indexEntry.id === id)
        if (userRoleToUpdate) {
            const userRoleToUpdateClone = { ...userRoleToUpdate }
            userRoleToUpdateClone.roles = userRole.roles
            userRoleToUpdateClone.updated = new Date()
            userRoleToUpdateClone.updatedBy = this.firebaseService.getCurrentUserId() || ''

            const updateEntryIndex = this.userRoleList.findIndex(
                (userRoleItem) => userRoleItem.id === id
            )
            this.userRoleList[updateEntryIndex] = userRoleToUpdateClone
            this.adminDao.saveUserRole(userRoleToUpdate, id)
        }
    }
}
