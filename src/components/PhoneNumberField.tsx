import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

import { IonItem, IonLabel, IonText } from '@ionic/react'
import 'react-phone-input-2/lib/style.css'

export interface PhoneNumberFieldProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    readonly?: boolean
    errors?: DeepMap<Record<string, any>, FieldError>
}

const PhoneNumberField: FC<PhoneNumberFieldProps> = ({ name, control, label, errors }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue=''
                name={name}
                render={({ onChange, value }) => <PhoneInput country='IN' value={value} />}
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

export default PhoneNumberField
