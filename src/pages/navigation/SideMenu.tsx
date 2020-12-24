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
    constructOutline,
    informationCircleOutline,
    logOutOutline,
    personOutline,
} from 'ionicons/icons'

import { RouteEnum } from '../../constants/RouteEnum'
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
            path: RouteEnum.ABOUT_TAB,
            iosIcon: informationCircleOutline,
            mdIcon: informationCircleOutline,
        },
    ],
    loggedInPages: [
        {
            title: 'Dashboard',
            path: RouteEnum.DASHBOARD,
            iosIcon: calendarOutline,
            mdIcon: calendarOutline,
        },
        {
            title: 'Admin',
            path: RouteEnum.ADMIN,
            iosIcon: constructOutline,
            mdIcon: constructOutline,
        },
        {
            title: 'Account',
            path: RouteEnum.ACCOUNT,
            iosIcon: personOutline,
            mdIcon: personOutline,
        },
        {
            title: 'Logout',
            path: RouteEnum.LOGOUT,
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
        <IonMenu contentId='private' menuId='sideMenu' type='overlay'>
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
