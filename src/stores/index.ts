import { configure } from 'mobx'

import AuthStore from '../pages/auth/auth-store'
import EventStore from '../pages/timesheet/event-store'
import TimeEntryList from '../pages/timesheet/timeentry-list-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

class RootStore {
    authStore: AuthStore

    eventStore: EventStore

    timeEntryList: TimeEntryList

    constructor() {
        this.timeEntryList = new TimeEntryList()
        this.authStore = new AuthStore()
        this.eventStore = new EventStore()
    }
}

export default RootStore
