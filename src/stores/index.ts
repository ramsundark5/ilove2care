import { configure } from 'mobx'

import AuthStore from '../pages/auth/auth-store'
import TimeEntryList from '../pages/timesheet/timeentry-list-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

class RootStore {
    timeEntryList: TimeEntryList

    authStore: AuthStore

    constructor() {
        this.timeEntryList = new TimeEntryList()
        this.authStore = new AuthStore()
    }
}

export default RootStore
