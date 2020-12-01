import React from 'react'

import { IonAlert } from '@ionic/react'

interface ArchiveProjectAlertProps {
    confirmationAction: any
    cancelAction: any
    showAlert: boolean
}

const ArchiveProjectAlert: React.FC<ArchiveProjectAlertProps> = ({
    confirmationAction,
    cancelAction,
    showAlert,
}) => {
    const alertButtons = [
        {
            text: 'Archive',
            handler: confirmationAction,
        },
        {
            text: 'Cancel',
            handler: cancelAction,
        },
    ]

    return (
        <IonAlert
            buttons={alertButtons}
            header='Archive Project'
            isOpen={showAlert}
            message='Are you sure you want to archive this project?'
        />
    )
}

export default ArchiveProjectAlert
