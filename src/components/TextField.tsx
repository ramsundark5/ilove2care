import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react'

export interface TexFieldProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    type?: 'password' | 'text'
    defaultValue?: string
    errors?: DeepMap<Record<string, any>, FieldError>
}

const TextField: FC<TexFieldProps> = ({ name, control, type, label, errors, defaultValue = '' }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue={defaultValue}
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

export default TextField
