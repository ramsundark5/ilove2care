import React, { useEffect, useState } from 'react'

import { IonContent, IonLoading, IonPage } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import CreditList from '../credits/CreditList'
import { ICredit } from '../credits/models/ICredit'

const DashboardPage: React.FC = () => {
    const { creditStore } = useStore()
    const userCreditList: ICredit[] = creditStore.userCredits
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

    return (
        <IonPage id='credit-page'>
            <ToolBar showBackButton={false} title='Dashboard' />
            <IonContent>
                <CreditList creditEntries={userCreditList} fromAdmin={false} />
            </IonContent>
            <IonLoading isOpen={!didLoad} />
        </IonPage>
    )
}

export default observer(DashboardPage)
