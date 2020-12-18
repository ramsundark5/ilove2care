import React from 'react'

import { IonLoading } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import { CreditItem } from './CreditItem'
import { ICredit } from './models/ICredit'

const CreditList: React.FC = () => {
    const { creditStore } = useStore()
    const creditEntries: ICredit[] = creditStore.list
    return (
        <>
            {creditEntries.map((creditEntry) => (
                <CreditItem credit={creditEntry} key={creditEntry.id} />
            ))}
            <IonLoading isOpen={!creditStore.initialized} />
        </>
    )
}

export default observer(CreditList)
