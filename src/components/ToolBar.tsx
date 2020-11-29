import React, { FC } from 'react'

import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'

export interface ToolBarProps {
    showBackButton?: boolean
    backHref?: string
    title?: string
}

const ToolBar: FC<ToolBarProps> = ({ showBackButton = true, backHref, title = '' }) => (
    <IonHeader>
        <IonToolbar>
            {showBackButton && (
                <IonButtons slot='start'>
                    <IonBackButton defaultHref={backHref} />
                </IonButtons>
            )}
            <IonTitle color='primary'>{title}</IonTitle>
        </IonToolbar>
    </IonHeader>
)

export default ToolBar
