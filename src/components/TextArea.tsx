import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonItem, IonLabel, IonText, IonTextarea } from '@ionic/react'

export interface TextAreaProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    readonly?: boolean
    errors?: DeepMap<Record<string, any>, FieldError>
}

const TextArea: FC<TextAreaProps> = ({ name, control, label, readonly, errors }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue=''
                name={name}
                render={({ onChange, value }) => (
                    <IonTextarea onIonChange={onChange} readonly={readonly} value={value} />
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

export default TextArea
