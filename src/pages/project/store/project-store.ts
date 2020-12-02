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

    constructor() {
        makeAutoObservable(this)
        this.projectDao = new ProjectDao()
        this.firebaseService = new FirebaseService()
    }

    loadData = async () => {
        const results = await this.projectDao.getAll()
        if (results.length < 1) {
            return false
        }
        runInAction(() => {
            this.list = results
        })
        return true
    }

    findById = (id: string) => {
        const matchedProject = this.list.find((indexTimeEntry) => indexTimeEntry.id === id)
        return matchedProject
    }

    add = async (project: IProject) => {
        const currentUserId = this.firebaseService.getCurrentUserId()
        if (!currentUserId) {
            return
        }
        project.status = 'Active'
        project.id = uuidv4()
        project.created = new Date()
        project.updated = new Date()
        await this.projectDao.save(project)
        this.list.push(project)
    }

    updateProject = (updatedProject: IProject, id: string) => {
        const projectToUpdate = this.list.find((indexEntry) => indexEntry.id === id)
        if (projectToUpdate) {
            projectToUpdate.name = updatedProject.name
            projectToUpdate.description = updatedProject.description
            projectToUpdate.status = updatedProject.status
            projectToUpdate.users = updatedProject.users
            projectToUpdate.updated = new Date()
            this.projectDao.save(projectToUpdate)
        }
    }

    archive = (project: IProject): void => {
        this.list.splice(
            this.list.findIndex((indexEntry) => indexEntry.id === project.id),
            1
        )
        this.projectDao.archive(project.id)
    }
}
