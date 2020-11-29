import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonItem, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react'

export interface SelectFieldProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    options?: any
    currentValue?: string
    errors?: DeepMap<Record<string, any>, FieldError>
}

export interface SelectFieldOptionProps {
    label: string
    value: string
}

const SelectField: FC<SelectFieldProps> = ({ name, control, options, label, errors }) => (
    <>
        <IonItem>
            {label && <IonLabel position='floating'>{label}</IonLabel>}
            <Controller
                control={control}
                defaultValue=''
                name={name}
                render={({ onChange, value }) => (
                    <IonSelect onIonChange={onChange} placeholder='Select One' value={value}>
                        {options.map((option: any) => (
                            <IonSelectOption key={option.value} value={option.value}>
                                {option.label}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
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

export default SelectField
