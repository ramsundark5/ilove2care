/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import FirebaseService from '../../../services/FirebaseService'
import { ICredit } from '../models/ICredit'
import CreditDao from './CreditDao'

export default class CreditStore {
    list: ICredit[] = []

    query = ''

    creditDao: CreditDao

    firebaseService: FirebaseService

    initialized = false

    constructor() {
        makeAutoObservable(this)
        this.creditDao = new CreditDao()
        this.firebaseService = new FirebaseService()
    }

    getUserCredits = async () => {
        const results = await this.creditDao.getUserCredits()
        runInAction(() => {
            this.list = results
            this.initialized = true
        })
    }

    addCredit = (credit: ICredit) => {
        const currentUserId = this.firebaseService.getCurrentUserId()
        if (!currentUserId) {
            return
        }
        credit.id = uuidv4()
        credit.userId = currentUserId
        credit.created = new Date()
        credit.updated = new Date()
        credit.updatedBy = this.firebaseService.getCurrentUser()?.email || ''
        credit.id = uuidv4()
        this.list.push(credit)
        this.creditDao.save(credit)
    }

    updateCredit = (updatedCredit: ICredit, id: string) => {
        const creditToUpdate = this.list.find((indexCredit) => indexCredit.id === id)
        if (creditToUpdate) {
            creditToUpdate.title = updatedCredit.title
            creditToUpdate.start = updatedCredit.start
            creditToUpdate.end = updatedCredit.end
            creditToUpdate.note = updatedCredit.note || ''
            creditToUpdate.projectId = updatedCredit.projectId
            creditToUpdate.updated = new Date()
            creditToUpdate.updatedBy = this.firebaseService.getCurrentUser()?.email || ''
            this.creditDao.save(creditToUpdate)
        }
    }

    removeCredit = (credit: ICredit): void => {
        this.list.splice(
            this.list.findIndex((indexCredit) => indexCredit.id === credit.id),
            1
        )
        this.creditDao.remove(credit.projectId, credit.id)
    }
}
