import './SideMenu.css'

import React from 'react'
import { useLocation } from 'react-router-dom'

import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
} from '@ionic/react'
import {
    calendarOutline,
    chatboxOutline,
    informationCircleOutline,
    logOutOutline,
    personOutline,
    readerOutline,
} from 'ionicons/icons'

import { useStore } from '../../hooks/use-store'

interface AppPage {
    title: string
    path: string
    iosIcon: string
    mdIcon: string
}

const appPages = {
    publicPages: [
        {
            title: 'About',
            path: '/tabs/about',
            iosIcon: informationCircleOutline,
            mdIcon: informationCircleOutline,
        },
        {
            title: 'Support',
            path: '/tabs/support',
            iosIcon: chatboxOutline,
            mdIcon: chatboxOutline,
        },
    ],
    loggedInPages: [
        {
            title: 'Timesheet',
            path: '/tabs/timesheet',
            iosIcon: calendarOutline,
            mdIcon: calendarOutline,
        },
        {
            title: 'Project',
            path: '/tabs/project',
            iosIcon: readerOutline,
            mdIcon: readerOutline,
        },
        {
            title: 'Profile',
            path: '/tabs/profile',
            iosIcon: personOutline,
            mdIcon: personOutline,
        },
        {
            title: 'Logout',
            path: '/logout',
            iosIcon: logOutOutline,
            mdIcon: logOutOutline,
        },
    ],
}

const Menu: React.FC = () => {
    const location = useLocation()
    const { authStore } = useStore()
    const { loggedIn } = authStore
    function renderlistItems(list: AppPage[]) {
        return list
            .filter((route) => !!route.path)
            .map((appPage) => (
                <IonMenuToggle autoHide={false} key={appPage.title}>
                    <IonItem
                        className={location.pathname === appPage.path ? 'selected' : ''}
                        detail={false}
                        lines='none'
                        routerDirection='none'
                        routerLink={appPage.path}
                    >
                        <IonIcon icon={appPage.iosIcon} slot='start' />
                        <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
            ))
    }

    return (
        <IonMenu contentId='menu' type='overlay'>
            <IonContent forceOverscroll={false}>
                <IonList lines='none'>
                    <IonListHeader>General</IonListHeader>
                    {renderlistItems(appPages.publicPages)}
                </IonList>
                <IonList lines='none'>
                    <IonListHeader>Account</IonListHeader>
                    {loggedIn
                        ? renderlistItems(appPages.loggedInPages)
                        : renderlistItems(appPages.publicPages)}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu
