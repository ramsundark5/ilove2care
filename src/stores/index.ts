import { configure } from 'mobx'

import AuthStore from '../pages/auth/auth-store'
import ProjectStore from '../pages/timesheet/store/project-store'
import TimesheetStore from '../pages/timesheet/store/timesheet-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

class RootStore {
    authStore: AuthStore

    timesheetStore: TimesheetStore

    projectStore: ProjectStore

    constructor() {
        this.timesheetStore = new TimesheetStore()
        this.authStore = new AuthStore()
        this.projectStore = new ProjectStore()
    }

    init() {
        this.projectStore.loadData()
    }
}

export default RootStore
