import React, { useEffect, useState } from 'react'

import { IonContent, IonLoading, IonPage } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import CreditList from '../credits/CreditList'
import { ICredit } from '../credits/models/ICredit'
import TotalCredits from './TotalCredits'

const DashboardPage: React.FC = () => {
    const { adminStore, creditStore } = useStore()
    const { currentUserRole } = adminStore
    let isVerified = false
    if (currentUserRole && currentUserRole.roles && currentUserRole.roles.length > 0) {
        isVerified = true
    }
    const userCreditList: ICredit[] = [...creditStore.userCredits]
    const [didLoad, setDidLoad] = useState<boolean>(false)

    useEffect(() => {
        async function loadProjectCredits() {
            await creditStore.getUserCredits()
            setDidLoad(true)
            log.info('loaded user credit list in dashboardpage')
        }
        if (!didLoad) {
            loadProjectCredits()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [didLoad])

    if (!isVerified) {
        return (
            <IonPage id='credit-page'>
                <ToolBar showBackButton={false} title='Dashboard' />
                <IonContent>
                    <p>
                        Your account is not verified. If account is not verified for more than 24
                        hours, please email the admin at ilove2careindia@gmail.com
                    </p>
                </IonContent>
                <IonLoading isOpen={!didLoad} />
            </IonPage>
        )
    }
    return (
        <IonPage id='credit-page'>
            <ToolBar showBackButton={false} title='Dashboard' />
            <IonContent>
                <TotalCredits creditEntries={userCreditList} />
                <CreditList creditEntries={userCreditList} fromAdmin={false} />
            </IonContent>
            <IonLoading isOpen={!didLoad} />
        </IonPage>
    )
}

export default observer(DashboardPage)
