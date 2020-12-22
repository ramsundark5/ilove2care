import React from 'react'

import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import ProjectList from './ProjectList'
import './Project.scss'

const ProjectPage: React.FC = () => (
    <IonPage id='project-page'>
        <ToolBar backHref={RouteEnum.ADMIN} title='Project' />
        <IonContent>
            <ProjectList />
        </IonContent>
        <IonFooter className='ion-margin-bottom ion-no-border'>
            <IonButton
                className='ion-padding'
                color='primary'
                expand='block'
                routerLink={RouteEnum.PROJECT_ADD}
            >
                Add Project
            </IonButton>
        </IonFooter>
    </IonPage>
)

export default ProjectPage
