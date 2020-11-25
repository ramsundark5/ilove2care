import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react'

export interface InputProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    type?: 'password' | 'text'
    errors?: DeepMap<Record<string, any>, FieldError>
}

const Input: FC<InputProps> = ({ name, control, type, label, errors }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue=''
                name={name}
                render={({ onChange }) => <IonInput onIonChange={onChange} type={type} />}
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

export default Input