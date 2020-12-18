import React from 'react'

import { IonItem, IonLabel } from '@ionic/react'
import dayjs from 'dayjs'

import { useStore } from '../../hooks/use-store'
import { ICredit } from './models/ICredit'

interface CreditItemProps {
    credit: ICredit
}

export const CreditItem = ({ credit }: CreditItemProps) => {
    const { projectStore } = useStore()
    const startDate = dayjs(credit.start)
    const endDate = dayjs(credit.end)

    const project = credit.projectId ? projectStore.findById(credit.projectId) : { name: null }
    const projectName = project && project.name ? project.name : null
    return (
        <IonItem routerLink={`/tabs/admin/projects/${credit.projectId}/credits/${credit.id}/save`}>
            <IonLabel>
                <h3>
                    {credit.title} - {projectName}
                </h3>
                <p>
                    {startDate.format('MMM D, YYYY h:mm A')}&mdash;&nbsp;
                    {endDate.format('MMM D, YYYY h:mm A')}
                </p>
                <p>{credit.note}</p>
            </IonLabel>
        </IonItem>
    )
}
