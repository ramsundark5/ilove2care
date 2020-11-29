/* eslint-disable no-param-reassign */
import { makeAutoObservable, runInAction } from 'mobx'

import { IProject } from '../models/IProject'
import ProjectDao from './ProjectDao'

export default class ProjectStore {
    list: IProject[] = []

    query = ''

    projectDao: ProjectDao

    constructor() {
        makeAutoObservable(this)
        this.projectDao = new ProjectDao()
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
}
