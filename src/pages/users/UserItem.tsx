import React from 'react'

import { IonIcon, IonItem, IonLabel } from '@ionic/react'
import { checkmarkCircleOutline, warningOutline } from 'ionicons/icons'

import { RouteEnum } from '../../constants/RouteEnum'
import { getPath } from '../../helpers/URLHelper'
import { useStore } from '../../hooks/use-store'
import { IUser } from '../account/model/IUser'
import { IRole } from '../admin/model/IRole'

interface UserItemProps {
    user: IUser
}

const getUserStatus = (userRole: IRole | undefined) => {
    let isVerified = false
    if (userRole && userRole.roles && userRole.roles.length > 0) {
        isVerified = true
    }
    if (isVerified) {
        return <IonIcon color='success' icon={checkmarkCircleOutline} slot='end' />
    }
    return <IonIcon color='warning' icon={warningOutline} slot='end' />
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    const { adminStore } = useStore()
    const userRole = [...adminStore.userRoleList].find((item) => item.id === user.id)
    return (
        <IonItem detail routerLink={getPath(RouteEnum.ADMIN_USER_SAVE, { id: user.id })}>
            <IonLabel>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
            </IonLabel>
            {getUserStatus(userRole)}
        </IonItem>
    )
}

export default UserItem
