import React from 'react'

import { IonChip, IonItem, IonLabel } from '@ionic/react'

import { RouteEnum } from '../../constants/RouteEnum'
import { getPath } from '../../helpers/URLHelper'
import { IProject } from './models/IProject'

interface ProjectItemProps {
    project: IProject
}

export const ProjectItem = ({ project }: ProjectItemProps) => (
    <>
        <IonItem routerLink={getPath(RouteEnum.PROJECT_SAVE, { id: project.id })}>
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
    </>
)
