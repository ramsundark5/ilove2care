import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonItem, IonLabel, IonText, IonTextarea } from '@ionic/react'

export interface TextAreaProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    defaultValue?: string
    errors?: DeepMap<Record<string, any>, FieldError>
}

const TextArea: FC<TextAreaProps> = ({ name, control, label, errors, defaultValue }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue={defaultValue}
                name={name}
                render={({ onChange }) => <IonTextarea onIonChange={onChange} />}
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

export default TextArea
