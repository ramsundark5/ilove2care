import React, { useRef, useState } from 'react'

import {
    IonChip,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
} from '@ionic/react'
import { archiveOutline, pencilOutline } from 'ionicons/icons'

import { useStore } from '../../hooks/use-store'
import ArchiveProjectAlert from './ArchiveProjectAlert'
import { IProject } from './models/IProject'

interface ProjectItemProps {
    project: IProject
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
    const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
    const [showAlert, setShowAlert] = useState(false)
    const { projectStore } = useStore()

    return (
        <IonItemSliding ref={ionItemSlidingRef}>
            <IonItem routerLink={`/tabs/admin/project/save/${project.id}`}>
                <IonLabel>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p>
                        Team:{' '}
                        {project.users &&
                            project.users.map &&
                            project.users.map((user) => <IonChip key={user}>{user}</IonChip>)}
                    </p>
                </IonLabel>
            </IonItem>
            <IonItemOptions side='end'>
                <IonItemOption color='primary'>
                    <IonIcon icon={pencilOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color='danger' onClick={() => setShowAlert(true)}>
                    <IonIcon icon={archiveOutline} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
            <ArchiveProjectAlert
                cancelAction={() => setShowAlert(false)}
                confirmationAction={() => {
                    setShowAlert(false)
                    projectStore.archive(project)
                }}
                showAlert={showAlert}
            />
        </IonItemSliding>
    )
}
