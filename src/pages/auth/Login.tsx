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

const Login: React.FC = () => {
    const history = useHistory()
    const uiConfig = {
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        signInFlow: 'popup',
        signInSuccessUrl: '', // Specifying sign in success url can cause double redirect since we are also managing redirect in react-router with local state.
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Enable one-tap sign-in.
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        callbacks: {
            signInSuccessWithAuthResult: () => {
                history.push('/tabs/timesheet')
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
                        <IonText className='title'>Welcome to I love to care</IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className='text-center'>
                        <IonText className='text-center'>
                            Volunteer organization to promote, support and enhance social
                            responsibilities and charitable works.
                        </IonText>
                    </IonCol>
                </IonRow>
                <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig} />
            </IonContent>
        </IonPage>
    )
}
export default Login
