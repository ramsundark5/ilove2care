import React, { FC } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonItem, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react'

export interface SelectFieldProps {
    name: string
    displayType?: 'alert' | 'popover' | 'action-sheet'
    classname?: string
    control?: Control
    label?: string
    rules?: any
    options?: any
    multiple?: boolean
    errors?: DeepMap<Record<string, any>, FieldError>
}

export interface SelectFieldOptionProps {
    label: string
    value: string
    header?: boolean
}

const SelectField: FC<SelectFieldProps> = ({
    name,
    displayType = 'alert',
    control,
    options,
    multiple = false,
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
                render={({ onChange, value }) => (
                    <IonSelect
                        interface={displayType}
                        multiple={multiple}
                        onIonChange={onChange}
                        value={value}
                    >
                        {options.map((option: any) => (
                            <IonSelectOption
                                disabled={option?.header || false}
                                key={option.value}
                                value={option.value}
                            >
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
