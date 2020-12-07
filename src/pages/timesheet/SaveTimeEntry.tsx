/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'
import { date, object, string } from 'yup'

import DateField from '../../components/DateField'
import SelectField, { SelectFieldOptionProps } from '../../components/SelectField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IProject } from '../project/models/IProject'
import DeleteTimesheetAlert from './DeleteTimesheetAlert'
import { ITimeEntry } from './models/ITimeEntry'

interface SaveTimeEntryProps
    extends RouteComponentProps<{
        id: string
    }> {}

const SaveTimeEntry: React.FC<SaveTimeEntryProps> = ({ history, match }) => {
    const { projectStore, timesheetStore } = useStore()
    const existingTimeEntry = timesheetStore.list.find((item) => item.id === match.params.id)
    const [didLoad, setDidLoad] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState(false)
    const [projects, setProjects] = useState<SelectFieldOptionProps[]>([])
    const hiddenSubmitBtnRef: any = useRef()

    useEffect(() => {
        if (!didLoad) {
            const results: IProject[] = [...projectStore.userProjects]
            const projectOptions: SelectFieldOptionProps[] = []
            for (const project of results) {
                const projectOption = {} as SelectFieldOptionProps
                projectOption.label = project.name
                projectOption.value = project.id
                projectOptions.push(projectOption)
            }
            setProjects(projectOptions)
            setDidLoad(true)
            log.info('loaded project list in SaveTimeEntry')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [didLoad])

    const saveTimeEntry = (timeEntry: ITimeEntry) => {
        try {
            if (existingTimeEntry && existingTimeEntry.id) {
                timesheetStore.updateTimeEntry(timeEntry, existingTimeEntry.id)
            } else {
                timesheetStore.addTimeEntry(timeEntry)
            }
            history.goBack()
        } catch (err) {
            log.error(err)
        }
    }

    const removeTimeEntry = () => {
        if (!existingTimeEntry) {
            return
        }
        setShowAlert(false)
        timesheetStore.removeTimeEntry(existingTimeEntry)
        history.goBack()
    }

    const onSaveClick = () => {
        if (hiddenSubmitBtnRef.current) {
            hiddenSubmitBtnRef.current.click()
        }
    }

    const validationSchema = object().shape({
        title: string().required('Title is required'),
        start: date().required('Start date and time is required'),
        end: date().required('End date and time is required'),
        note: string(),
        projectId: string().required('Project selection is required'),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: existingTimeEntry?.title,
            start: existingTimeEntry?.start?.toISOString() || null,
            end: existingTimeEntry?.end?.toISOString() || null,
            note: existingTimeEntry?.note,
            projectId: existingTimeEntry?.projectId,
        },
    })

    return (
        <IonPage id='save-timentry'>
            <ToolBar backHref='/tabs/timesheet' title='Time Entry' />
            <IonContent>
                <form id='timeEntryForm' onSubmit={handleSubmit(saveTimeEntry)}>
                    <TextField
                        control={control}
                        errors={errors}
                        key='title'
                        label='Title'
                        name='title'
                        type='text'
                    />

                    <SelectField
                        control={control}
                        errors={errors}
                        key='projectId'
                        label='Project'
                        name='projectId'
                        options={projects}
                    />

                    <DateField
                        control={control}
                        errors={errors}
                        key='startTime'
                        label='Start Time'
                        name='start'
                    />

                    <DateField
                        control={control}
                        errors={errors}
                        key='endTime'
                        label='End Time'
                        name='end'
                    />
                    <TextArea
                        control={control}
                        errors={errors}
                        key='note'
                        label='Note'
                        name='note'
                    />
                </form>
                <DeleteTimesheetAlert
                    cancelAction={() => setShowAlert(false)}
                    confirmationAction={() => removeTimeEntry()}
                    showAlert={showAlert}
                />
            </IonContent>
            <IonFooter className='ion-margin-bottom ion-no-border'>
                <IonButton className='ion-padding' expand='block' onClick={() => onSaveClick()}>
                    Save
                </IonButton>
                <button
                    form='timeEntryForm'
                    hidden
                    id='submitBtn'
                    ref={hiddenSubmitBtnRef}
                    type='submit'
                />
                {existingTimeEntry && existingTimeEntry.id && (
                    <IonButton
                        className='ion-padding'
                        color='danger'
                        expand='block'
                        onClick={() => setShowAlert(true)}
                    >
                        Delete
                    </IonButton>
                )}
            </IonFooter>
        </IonPage>
    )
}

export default SaveTimeEntry
