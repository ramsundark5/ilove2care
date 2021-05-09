import React, { FC } from 'react'
import Geosuggest from 'react-geosuggest'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonItem, IonLabel, IonText } from '@ionic/react'

export interface PlacesAutoCompleteFieldProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    type?: 'password' | 'text' | 'email' | 'tel'
    readonly?: boolean
    errors?: DeepMap<Record<string, any>, FieldError>
}

const PlacesAutoCompleteField: FC<PlacesAutoCompleteFieldProps> = ({
    name,
    control,
    label,
    errors,
}) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue=''
                name={name}
                render={({ value }) => <Geosuggest id={name} value={value} />}
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

export default PlacesAutoCompleteField
