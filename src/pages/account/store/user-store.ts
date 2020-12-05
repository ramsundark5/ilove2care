/* eslint-disable no-param-reassign */
import { makeAutoObservable, runInAction } from 'mobx'

import FirebaseService from '../../../services/FirebaseService'
import { IUser } from '../models/IUser'
import UserDao from './UserDao'

export default class UserStore {
    userDao: UserDao

    user: IUser | undefined

    userList: IUser[] = []

    firebaseService: FirebaseService

    initializedCurrentUser = false

    initializedAllUsers = false

    constructor() {
        makeAutoObservable(this)
        this.userDao = new UserDao()
        this.firebaseService = new FirebaseService()
    }

    loadCurrentUser = async () => {
        let currentUser: IUser = await this.userDao.get()
        runInAction(() => {
            if (!currentUser || !currentUser?.email || !currentUser?.email) {
                const authUser = this.firebaseService.getCurrentUser()
                const currentUserId = this.firebaseService.getCurrentUserId()
                if (authUser && currentUserId) {
                    currentUser = {
                        id: currentUserId,
                        name: authUser.displayName || '',
                        email: authUser.email || '',
                        description: '',
                        skills: [],
                        roles: [],
                        created: new Date(),
                        updated: new Date(),
                    }
                    this.userDao.save(currentUser)
                }
            }
            this.user = currentUser
            this.initializedCurrentUser = true
        })
        return true
    }

    loadAllUsers = async () => {
        const users: IUser[] = await this.userDao.getAll()
        runInAction(() => {
            this.userList = users
            this.initializedAllUsers = true
        })
    }

    saveProfile = (updatedUser: IUser) => {
        if (this.user) {
            this.user.name = updatedUser.name
            this.user.email = updatedUser.email
            this.userDao.save({ ...this.user })
        }
    }

    saveSkills = (updatedSkills: string[]) => {
        if (this.user) {
            this.user.skills = updatedSkills
            this.userDao.save({ ...this.user })
        }
    }

    get skills(): string[] {
        if (this.user && this.user.skills && this.user.skills.length > 0) {
            return [...this.user.skills]
        }
        return []
    }
}
