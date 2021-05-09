/* eslint-disable no-param-reassign */
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import FirebaseService from '../../../services/FirebaseService'
import { ICredit } from '../models/ICredit'
import CreditDao from './CreditDao'

export default class CreditStore {
    projectCredits: ICredit[] = []

    userCredits: ICredit[] = []

    query = ''

    creditDao: CreditDao

    firebaseService: FirebaseService

    userCreditsInitialized = false

    projectCreditsInitialized = false

    constructor() {
        makeAutoObservable(this)
        this.creditDao = new CreditDao()
        this.firebaseService = new FirebaseService()
    }

    getUserCredits = async () => {
        const results = await this.creditDao.getUserCredits()
        runInAction(() => {
            this.userCredits = results
            this.userCreditsInitialized = true
        })
    }

    getProjectCredits = async (projectId: string) => {
        const results = await this.creditDao.getProjectCredits(projectId)
        runInAction(() => {
            this.projectCredits = results
            this.projectCreditsInitialized = true
        })
        return results
    }

    addCredit = (credit: ICredit) => {
        credit.id = uuidv4()
        credit.created = new Date()
        credit.updated = new Date()
        credit.updatedBy = this.firebaseService.getCurrentUser()?.email || ''
        this.projectCredits.push(credit)
        this.creditDao.save(credit)
    }

    updateCredit = (updatedCredit: ICredit, id: string) => {
        const creditToUpdate = this.projectCredits.find((indexCredit) => indexCredit.id === id)
        if (creditToUpdate) {
            creditToUpdate.title = updatedCredit.title
            creditToUpdate.start = updatedCredit.start
            creditToUpdate.end = updatedCredit.end
            creditToUpdate.note = updatedCredit.note || ''
            creditToUpdate.credit = updatedCredit.credit
            creditToUpdate.updated = new Date()
            creditToUpdate.updatedBy = this.firebaseService.getCurrentUser()?.email || ''
            this.creditDao.save(creditToUpdate)
        }
    }

    removeCredit = (credit: ICredit): void => {
        this.projectCredits.splice(
            this.projectCredits.findIndex((indexCredit) => indexCredit.id === credit.id),
            1
        )
        this.creditDao.remove(credit.projectId, credit.id)
    }
}
