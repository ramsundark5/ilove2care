import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonDatetime, IonItem, IonLabel, IonText, IonTextarea } from '@ionic/react'

export interface DateFieldProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    errors?: DeepMap<Record<string, any>, FieldError>
}

const DateField: FC<DateFieldProps> = ({ name, control, label, errors }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue=''
                name={name}
                render={({ onChange }) => <IonDatetime onIonChange={onChange} />}
            />
        </IonItem>
        {errors && errors[name] && (
            <IonText className='ion-padding-start' color='danger'>
                <small>
                    <span id={`${name}Error`} role='alert'>
                        {errors[name].message}
                    </span>
                </small>
            </IonText>
        )}
    </>
)

export default DateField
