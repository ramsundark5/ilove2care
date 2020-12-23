import React from 'react'

import { IonItem, IonLabel } from '@ionic/react'

import { RouteEnum } from '../../constants/RouteEnum'
import { getPath } from '../../helpers/URLHelper'
import { useStore } from '../../hooks/use-store'
import { ICredit } from './models/ICredit'

interface CreditItemProps {
    credit: ICredit
    fromAdmin: boolean
}

export const CreditItem = ({ credit, fromAdmin }: CreditItemProps) => {
    const { projectStore } = useStore()

    const project = credit.projectId ? projectStore.findById(credit.projectId) : { name: null }
    const projectName = project && project.name ? project.name : null
    let saveCreditURL = null
    if (fromAdmin) {
        saveCreditURL = getPath(RouteEnum.CREDIT_SAVE, {
            projectId: credit.projectId,
            creditId: credit.id,
        })
    } else {
        saveCreditURL = getPath(RouteEnum.DASHBOARD_CREDIT_VIEW, {
            creditId: credit.id,
        })
    }

    return (
        <IonItem routerLink={saveCreditURL}>
            <IonLabel>
                <h3>
                    {credit.title} - {projectName}
                </h3>
                <p>Credits: {credit.credit}</p>
            </IonLabel>
        </IonItem>
    )
}
