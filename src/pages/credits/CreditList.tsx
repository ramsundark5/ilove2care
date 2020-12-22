import React from 'react'

import { CreditItem } from './CreditItem'
import { ICredit } from './models/ICredit'

interface CreditListProps {
    creditEntries: ICredit[]
}

const CreditList: React.FC<CreditListProps> = ({ creditEntries }: CreditListProps) => {
    return (
        <>
            {creditEntries.map((creditEntry) => (
                <CreditItem credit={creditEntry} key={creditEntry.id} />
            ))}
        </>
    )
}

export default CreditList
