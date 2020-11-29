import React from 'react'

import { IonAlert } from '@ionic/react'

interface DeleteProjectAlertProps {
    confirmationAction: any
    cancelAction: any
    showAlert: boolean
}

const DeleteProjectAlert: React.FC<DeleteProjectAlertProps> = ({
    confirmationAction,
    cancelAction,
    showAlert,
}) => {
    const alertButtons = [
        {
            text: 'Delete',
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
            header='Delete Time entry'
            isOpen={showAlert}
            message='Are you sure you want to delete this entry?'
        />
    )
}

export default DeleteProjectAlert
