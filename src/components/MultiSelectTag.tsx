import React, { FC, useState } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'

import {
    IonButton,
    IonChip,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonText,
} from '@ionic/react'
import { closeCircleOutline } from 'ionicons/icons'

export interface MultiSelectTagProps {
    name: string
    classname?: string
    control?: Control
    label?: string
    options?: any
    rules?: any
    readonly?: boolean
    errors?: DeepMap<Record<string, any>, FieldError>
}

const MultiSelectTag: FC<MultiSelectTagProps> = ({
    name,
    control,
    label,
    options,
    readonly,
    errors,
}) => {
    const [newTag, setTag] = useState('')
    const [filteredOptions, setFilteredOptions] = useState([])
    const [showOptions, setShowOptions] = useState(false)

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

    const onSearchChange = (input: string, existingUserList: any) => {
        const maxResults = 10
        if (!input || input === '') {
            setFilteredOptions([])
        }
        const matchedFilteredOptions: any = []

        for (const option of options) {
            if (option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
                if (!existingUserList.find((existingUser: any) => existingUser === option?.value)) {
                    matchedFilteredOptions.push(option)
                }
            }
            if (matchedFilteredOptions.length >= maxResults) {
                break
            }
        }
        setFilteredOptions(matchedFilteredOptions)
        setTag(input)
    }

    const onSelectSearchOption = (option: any, tagList: any) => {
        const updatedTagList = tagList.concat(option.value)
        control?.setValue(name, updatedTagList)
        setTag('')
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
                            {!readonly && (
                                <IonItem>
                                    <IonInput
                                        id={name}
                                        name={name}
                                        onFocus={() => setShowOptions(true)}
                                        onIonBlur={() => setShowOptions(false)}
                                        onIonChange={(e) =>
                                            onSearchChange(e.detail.value ?? '', value)
                                        }
                                        onKeyDown={(e) => onAddTagEvent(e, value)}
                                        type='text'
                                        value={newTag}
                                    />
                                    <IonButton
                                        onClick={() => onAddTag(value)}
                                        size='default'
                                        slot='end'
                                    >
                                        Add
                                    </IonButton>
                                </IonItem>
                            )}
                            {value &&
                                value.map &&
                                value.map((tag: any) => (
                                    <IonChip key={tag}>
                                        <IonLabel>{tag}</IonLabel>
                                        {!readonly && (
                                            <IonIcon
                                                icon={closeCircleOutline}
                                                onClick={() => onDeleteTag(tag, value)}
                                            />
                                        )}
                                    </IonChip>
                                ))}
                            {showOptions && (
                                <IonList>
                                    {filteredOptions.map((filteredOption: any, index) => (
                                        <>
                                            <IonButton
                                                fill='clear'
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={`option_item ${index}`}
                                                onClick={() =>
                                                    onSelectSearchOption(filteredOption, value)
                                                }
                                            >
                                                <IonLabel
                                                    // eslint-disable-next-line react/no-array-index-key
                                                    key={filteredOption.value + index}
                                                >
                                                    {filteredOption.label}
                                                </IonLabel>
                                            </IonButton>
                                            <br />
                                        </>
                                    ))}
                                </IonList>
                            )}
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
export default MultiSelectTag
