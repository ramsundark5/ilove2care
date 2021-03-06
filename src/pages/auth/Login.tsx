import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useHistory } from 'react-router'

import {
    IonCol,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'

import './Login.scss'
import { RouteEnum } from '../../constants/RouteEnum'

const Login: React.FC = () => {
    const history = useHistory()
    const uiConfig = {
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        signInFlow: 'popup',
        signInSuccessUrl: '', // Specifying sign in success url can cause double redirect since we are also managing redirect in react-router with local state.
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        // Enable one-tap sign-in.
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        callbacks: {
            signInSuccessWithAuthResult: () => {
                history.push(RouteEnum.DASHBOARD)
                return true
            },
        },
    }

    return (
        <IonPage id='welcome-page'>
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonTitle className='text-center'>I love to care</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonRow>
                    <IonCol className='text-center'>
                        <IonImg className='title-img' src='assets/img/welcome-background.png' />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className='text-center'>
                        <IonText className='title'>
                            Welcome to i Love To Care (India) Charitable Trust ™
                        </IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className='text-center'>
                        <IonText className='text-center'>
                            Volunteer Organization to promote, support and enhance social
                            responsibilities and charitable works and works through implementation
                            of ALL 17 United Nations Sustainable Development Goals throughout India.
                        </IonText>
                    </IonCol>
                </IonRow>
                <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig} />
            </IonContent>
        </IonPage>
    )
}
export default Login
