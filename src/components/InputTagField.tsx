/* eslint-disable operator-linebreak */
import React, { FC, useState } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import { IonButton, IonChip, IonIcon, IonInput, IonItem, IonLabel, IonText } from '@ionic/react'
import { closeCircleOutline } from 'ionicons/icons'

export interface InputTagFieldProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    rules?: any
    errors?: DeepMap<Record<string, any>, FieldError>
}

const InputTagField: FC<InputTagFieldProps> = ({ name, control, label, errors }) => {
    const [newTag, setTag] = useState('')

    const onAddTag = (tagList: any) => {
        const updatedTagList = tagList.concat(newTag)
        control?.setValue(name, updatedTagList)
        setTag('')
    }

    const onAddTagEvent = (event: any, tagList: any) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            onAddTag(tagList)
        }
    }

    const onDeleteTag = (tag: any, tagList: any) => {
        const updatedTagList = [...tagList]
        const deleteIndex = updatedTagList.indexOf(tag)
        updatedTagList.splice(deleteIndex, 1)
        control?.setValue(name, updatedTagList)
    }

    return (
        <IonItem>
            <div style={{ width: '100%' }}>
                {label && <IonLabel position='floating'>{label}</IonLabel>}
                <Controller
                    control={control}
                    defaultValue=''
                    name={name}
                    render={({ value }) => (
                        <>
                            <br />
                            <IonItem>
                                <IonInput
                                    onIonChange={(e) => setTag(e.detail.value ?? '')}
                                    onKeyDown={(e) => onAddTagEvent(e, value)}
                                    type='text'
                                    value={newTag}
                                />
                                <IonButton onClick={() => onAddTag(value)} slot='end'>
                                    Add
                                </IonButton>
                            </IonItem>
                            {value &&
                                value.map &&
                                value.map((tag: any) => (
                                    <IonChip key={tag}>
                                        <IonLabel>{tag}</IonLabel>
                                        <IonIcon
                                            icon={closeCircleOutline}
                                            onClick={() => onDeleteTag(tag, value)}
                                        />
                                    </IonChip>
                                ))}
                        </>
                    )}
                />
            </div>
            {errors && errors[name] && (
                <IonText className='ion-padding-start' color='danger'>
                    <small>
                        <span id={`${name}Error`} role='alert'>
                            {errors[name].message}
                        </span>
                    </small>
                </IonText>
            )}
        </IonItem>
    )
}

export default InputTagField
