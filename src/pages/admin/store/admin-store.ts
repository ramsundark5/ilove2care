/* eslint-disable no-param-reassign */
import { makeAutoObservable, runInAction } from 'mobx'

import FirebaseService from '../../../services/FirebaseService'
import { IRole } from '../model/IRole'
import AdminDao from './AdminDao'

export default class AdminStore {
    adminDao: AdminDao

    userRoleList: IRole[] = []

    currentUserRole: IRole | undefined

    firebaseService: FirebaseService

    initializedUserRole = false

    initializedUserRoleList = false

    isAdmin = false

    constructor() {
        makeAutoObservable(this)
        this.adminDao = new AdminDao()
        this.firebaseService = new FirebaseService()
    }

    loadAllUserRoles = async () => {
        const results = await this.adminDao.getAll()
        runInAction(() => {
            if (results.length > 0) {
                this.userRoleList = results
            }
            this.initializedUserRoleList = true
        })
        return true
    }

    getCurrentUserRoles = async () => {
        const currentUserId = this.firebaseService.getCurrentUserId()
        if (!currentUserId) {
            return null
        }
        const userRole: IRole = await this.adminDao.getUserRole(currentUserId)
        const userRoles = userRole?.roles || []
        runInAction(() => {
            this.currentUserRole = userRole
            this.initializedUserRole = true
            if (userRoles.includes('admin')) {
                this.isAdmin = true
            }
        })
        return userRole
    }

    add = (userRole: IRole, userId: string) => {
        const currentUserId = this.firebaseService.getCurrentUserId()
        if (!currentUserId) {
            return
        }
        userRole.created = new Date()
        userRole.updated = new Date()
        userRole.id = userId
        userRole.updatedBy = this.firebaseService.getCurrentUserId() || ''
        this.userRoleList.push(userRole)
        this.adminDao.saveUserRole(userRole)
    }

    update = (userRole: IRole, id: string) => {
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
            this.adminDao.saveUserRole(userRoleToUpdate)
        }
    }
}
