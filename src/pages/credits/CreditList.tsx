import React from 'react'

import { CreditItem } from './CreditItem'
import { ICredit } from './models/ICredit'

interface CreditListProps {
    creditEntries: ICredit[]
    fromAdmin: boolean
}

const CreditList: React.FC<CreditListProps> = ({ creditEntries, fromAdmin }: CreditListProps) => {
    return (
        <>
            {creditEntries.map((creditEntry) => (
                <CreditItem credit={creditEntry} fromAdmin={fromAdmin} key={creditEntry.id} />
            ))}
        </>
    )
}

export default CreditList
