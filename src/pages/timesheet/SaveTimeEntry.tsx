/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { date, object, string } from 'yup'

import DateField from '../../components/DateField'
import SelectField, { SelectFieldOptionProps } from '../../components/SelectField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IProject } from '../project/models/IProject'
import { ITimeEntry } from './models/ITimeEntry'

interface SaveTimeEntryProps
    extends RouteComponentProps<{
        id: string
    }> {}

const SaveTimeEntry: React.FC<SaveTimeEntryProps> = ({ history, match }) => {
    const { projectStore, timesheetStore } = useStore()
    const existingTimeEntry = timesheetStore.list.find((item) => item.id === match.params.id)
    const [didLoad, setDidLoad] = useState<boolean>(false)
    const [projects, setProjects] = useState<SelectFieldOptionProps[]>([])

    useEffect(() => {
        if (!didLoad) {
            const results: IProject[] = [...projectStore.list]
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
            <ToolBar title='Time Entry' />
            <IonContent>
                <form onSubmit={handleSubmit(saveTimeEntry)}>
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
                    <IonButton className='ion-padding' expand='block' type='submit'>
                        Save
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default SaveTimeEntry
