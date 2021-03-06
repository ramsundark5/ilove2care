import firebase from 'firebase/app'
import { configure } from 'mobx'

import UserStore from '../pages/account/store/user-store'
import AdminStore from '../pages/admin/store/admin-store'
import AuthStore from '../pages/auth/auth-store'
import CreditStore from '../pages/credits/store/credit-store'
import ProjectStore from '../pages/project/store/project-store'
import TimesheetStore from '../pages/timesheet/store/timesheet-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

class RootStore {
    authStore: AuthStore

    timesheetStore: TimesheetStore

    projectStore: ProjectStore

    userStore: UserStore

    adminStore: AdminStore

    creditStore: CreditStore

    constructor() {
        this.timesheetStore = new TimesheetStore()
        this.authStore = new AuthStore()
        this.projectStore = new ProjectStore()
        this.userStore = new UserStore()
        this.adminStore = new AdminStore()
        this.creditStore = new CreditStore()
    }

    init() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.timesheetStore.loadData()
                this.userStore.loadCurrentUser()
                this.projectStore.getUserProjects(user.email)
                await this.adminStore.getCurrentUserRoles()
                const { isAdmin } = this.adminStore
                if (isAdmin) {
                    this.projectStore.loadData()
                    this.userStore.loadAllUsers()
                    this.adminStore.loadAllUserRoles()
                }
            }
        })
    }
}

export default RootStore
