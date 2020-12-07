/* eslint-disable no-param-reassign */
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import FirebaseService from '../../../services/FirebaseService'
import { IProject } from '../models/IProject'
import ProjectDao from './ProjectDao'

export default class ProjectStore {
    list: IProject[] = []

    query = ''

    projectDao: ProjectDao

    firebaseService: FirebaseService

    initialized = false

    userProjects: IProject[] = []

    initializedUserProjects = false

    constructor() {
        makeAutoObservable(this)
        this.projectDao = new ProjectDao()
        this.firebaseService = new FirebaseService()
    }

    loadData = async () => {
        const results = await this.projectDao.getAll()
        runInAction(() => {
            if (results.length > 1) {
                this.list = results
            }
            this.initialized = true
        })
    }

    getUserProjects = async (userEmail: string | null) => {
        if (!userEmail) {
            return null
        }
        const results: IProject[] = await this.projectDao.getUserProjects(userEmail)
        runInAction(() => {
            this.userProjects = results
            this.initializedUserProjects = true
        })
        return results
    }

    findById = (id: string) => {
        const matchedProject = this.userProjects.find((indexTimeEntry) => indexTimeEntry.id === id)
        return matchedProject
    }

    add = (project: IProject) => {
        const currentUserId = this.firebaseService.getCurrentUserId()
        if (!currentUserId) {
            return
        }
        project.created = new Date()
        project.updated = new Date()
        project.id = uuidv4()
        this.list.push(project)
        this.projectDao.save(project)
    }

    updateProject = (updatedProject: IProject, id: string) => {
        const projectToUpdate = this.list.find((indexEntry) => indexEntry.id === id)
        if (projectToUpdate) {
            const projectToUpdateClone = { ...projectToUpdate }
            projectToUpdateClone.name = updatedProject.name
            projectToUpdateClone.description = updatedProject.description
            projectToUpdateClone.status = updatedProject.status
            projectToUpdateClone.users = [...updatedProject.users]
            projectToUpdateClone.updated = new Date()

            const updateEntryIndex = this.list.findIndex((project) => project.id === id)
            this.list[updateEntryIndex] = projectToUpdateClone
            this.projectDao.save(projectToUpdateClone)
        }
    }

    archive = (project: IProject): void => {
        this.list.splice(
            this.list.findIndex((indexEntry) => indexEntry.id === project.id),
            1
        )
        this.projectDao.archive(project.id)
    }

    get paginatedList() {
        // first sort the list
        const paginationSize = 50
        const sortedList = [...this.list].sort((a, b) => {
            if (!a.updated && b.updated) return 1
            if (a.updated && !b.updated) return -1
            return a.updated.getTime() - b.updated.getTime()
        })
        const paginatedList = sortedList.slice(0, paginationSize)
        return paginatedList
    }
}
