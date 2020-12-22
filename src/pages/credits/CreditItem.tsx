import React from 'react'

import { IonItem, IonLabel } from '@ionic/react'
import dayjs from 'dayjs'

import { RouteEnum } from '../../constants/RouteEnum'
import { getPath } from '../../helpers/URLHelper'
import { useStore } from '../../hooks/use-store'
import { ICredit } from './models/ICredit'

interface CreditItemProps {
    credit: ICredit
}

export const CreditItem = ({ credit }: CreditItemProps) => {
    const { projectStore } = useStore()

    const project = credit.projectId ? projectStore.findById(credit.projectId) : { name: null }
    const projectName = project && project.name ? project.name : null
    return (
        <IonItem
            routerLink={getPath(RouteEnum.CREDIT_SAVE, {
                projectId: credit.projectId,
                creditId: credit.id,
            })}
        >
            <IonLabel>
                <h3>
                    {credit.title} - {projectName}
                </h3>
                <p>Credits: {credit.credit}</p>
            </IonLabel>
        </IonItem>
    )
}
