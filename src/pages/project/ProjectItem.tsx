import React from 'react'

import { IonChip, IonItem, IonLabel } from '@ionic/react'

import { IProject } from './models/IProject'

interface ProjectItemProps {
    project: IProject
}

export const ProjectItem = ({ project }: ProjectItemProps) => (
    <>
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
        <IonItem detail routerLink={`/tabs/admin/projects/${project.id}/credits`}>
            Credits
        </IonItem>
    </>
)
