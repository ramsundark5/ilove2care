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

    const onSearchChange = (input: string) => {
        if (!input || input === '') {
            setFilteredOptions(options)
        }
        const matchedFilteredOptions = options.filter((option: any) => {
            let matchedOption = null
            if (option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
                matchedOption = option
            }
            return matchedOption
        })
        setFilteredOptions(matchedFilteredOptions)
        setTag(input)
    }

    const onSelectSearchOption = (option: any) => {
        console.log('inside onselectsearch')
        // const updatedTagList = tagList.concat(option.value)
        // control?.setValue(name, updatedTagList)
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
                                        onIonChange={(e) => onSearchChange(e.detail.value ?? '')}
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
                                        <IonItem
                                            button
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={filteredOption.value + index}
                                            onClick={() => onSelectSearchOption(filteredOption)}
                                        >
                                            {filteredOption.label}
                                        </IonItem>
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
