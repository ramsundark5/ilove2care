import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'

import { IonButton, IonContent, IonFooter, IonLoading, IonPage } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import ToolBar from '../../components/ToolBar'
import './Credit.scss'
import { RouteEnum } from '../../constants/RouteEnum'
import { getPath } from '../../helpers/URLHelper'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import CreditList from './CreditList'
import { ICredit } from './models/ICredit'

interface CreditPageProps
    extends RouteComponentProps<{
        projectId: string
    }> {}

const CreditPage: React.FC<CreditPageProps> = ({ match }) => {
    const { projectId } = match.params
    const { creditStore } = useStore()
    const projectCreditList: ICredit[] = creditStore.projectCredits
    const [didLoad, setDidLoad] = useState<boolean>(false)

    useEffect(() => {
        async function loadProjectCredits() {
            await creditStore.getProjectCredits(projectId)
            setDidLoad(true)
            log.info('loaded project credit list in CreditPage')
        }
        if (!didLoad) {
            loadProjectCredits()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [didLoad])

    return (
        <IonPage id='credit-page'>
            <ToolBar backHref={RouteEnum.PROJECT} title='Credit' />
            <IonContent>
                <CreditList creditEntries={projectCreditList} fromAdmin />
            </IonContent>
            <IonFooter className='ion-margin-bottom ion-no-border'>
                <IonButton
                    className='ion-padding'
                    color='primary'
                    expand='block'
                    routerLink={getPath(RouteEnum.CREDIT_ADD, { projectId })}
                >
                    Add Credit
                </IonButton>
            </IonFooter>
            <IonLoading isOpen={!didLoad} />
        </IonPage>
    )
}

export default observer(CreditPage)
