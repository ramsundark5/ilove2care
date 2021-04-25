import React from 'react'

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'

import './Dashboard.scss'
import log from '../../logger'
import { ICredit } from '../credits/models/ICredit'

interface TotalCreditsProps {
    creditEntries: ICredit[]
}

const TotalCredits: React.FC<TotalCreditsProps> = ({ creditEntries }: TotalCreditsProps) => {
    let total = 0
    for (const creditItem of creditEntries) {
        let itemCredit = 0
        try {
            itemCredit = parseFloat(`${creditItem.credit}`)
            total += itemCredit
        } catch (err) {
            log.error(`Error calculating total credits${err}`)
        }
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle className='text-center centerText'>Total Credits</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <div className='numberCircle'>{total}</div>
            </IonCardContent>
        </IonCard>
    )
}

export default TotalCredits
