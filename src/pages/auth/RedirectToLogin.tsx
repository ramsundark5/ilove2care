import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

import { useStore } from '../../hooks/use-store'

const RedirectToLogin: React.FC = () => {
    const { authStore } = useStore()
    const history = useHistory()

    useEffect(() => {
        authStore.onLogout()
        history.replace('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authStore])
    return null
}

export default RedirectToLogin
