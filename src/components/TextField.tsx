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
    currentValue?: string
    errors?: DeepMap<Record<string, any>, FieldError>
}

const TextField: FC<TexFieldProps> = ({ name, control, type, label, errors }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue=''
                name={name}
                render={({ onChange, onBlur, value }) => (
                    <IonInput onIonChange={onChange} type={type} value={value} />
                )}
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
