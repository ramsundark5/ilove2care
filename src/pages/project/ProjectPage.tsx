import React from 'react'

import { IonButton, IonContent, IonPage } from '@ionic/react'

import ToolBar from '../../components/ToolBar'
import ProjectList from './ProjectList'
import './Project.scss'

const ProjectPage: React.FC = () => (
    <IonPage id='project-page'>
        <ToolBar backHref='/tabs/admin' title='Project' />
        <IonContent>
            <ProjectList />
            <IonButton
                className='ion-padding'
                color='primary'
                expand='block'
                routerLink='/tabs/project/save'
            >
                Add Project
            </IonButton>
        </IonContent>
    </IonPage>
)

export default ProjectPage
