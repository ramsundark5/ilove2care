import React, { useRef, useState } from 'react'

import {
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
} from '@ionic/react'
import dayjs from 'dayjs'
import { pencilOutline, trashOutline } from 'ionicons/icons'

import { useStore } from '../../hooks/use-store'
import DeleteProjectAlert from './DeleteProjectAlert'
import { IProject } from './models/IProject'

interface ProjectItemProps {
    project: IProject
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
    const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
    const [showAlert, setShowAlert] = useState(false)
    const { projectStore } = useStore()

    return (
        <IonItemSliding class={`status-${project.status}`} ref={ionItemSlidingRef}>
            <IonItem>
                <IonLabel>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </IonLabel>
            </IonItem>
            <IonItemOptions side='end'>
                <IonItemOption color='primary' routerLink={`/tabs/project/save/${project.id}`}>
                    <IonIcon icon={pencilOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color='danger' onClick={() => setShowAlert(true)}>
                    <IonIcon icon={trashOutline} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
            <DeleteProjectAlert
                cancelAction={() => setShowAlert(false)}
                confirmationAction={() => {
                    setShowAlert(false)
                    projectStore.remove(project)
                }}
                showAlert={showAlert}
            />
        </IonItemSliding>
    )
}
