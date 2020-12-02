/* eslint-disable no-restricted-syntax */
import React from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { date, object, string } from 'yup'

import DateField from '../../components/DateField'
import InputTagField from '../../components/InputTagField'
import SelectField, { SelectFieldOptionProps } from '../../components/SelectField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IProject } from './models/IProject'

interface SaveProjectProps
    extends RouteComponentProps<{
        id: string
    }> {}

const SaveProject: React.FC<SaveProjectProps> = ({ history, match }) => {
    const { projectStore } = useStore()
    const existingProject = projectStore.list.find((item) => item.id === match.params.id)
    const statusOptions: SelectFieldOptionProps[] = [
        {
            label: 'Pending',
            value: 'pending',
        },
        {
            label: 'Active',
            value: 'active',
        },
        {
            label: 'Completed',
            value: 'completed',
        },
        {
            label: 'Hold',
            value: 'hold',
        },
    ]

    const save = (project: IProject) => {
        try {
            if (existingProject && existingProject.id) {
                projectStore.updateProject(project, existingProject.id)
            } else {
                projectStore.add(project)
            }
            history.goBack()
        } catch (err) {
            log.error(err)
        }
    }

    const validationSchema = object().shape({
        name: string().required(),
        start: date().nullable().default(undefined),
        end: date().nullable().default(undefined),
        description: string(),
        status: string(),
        user: string().email(),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: existingProject?.name,
            description: existingProject?.description,
            start: existingProject?.start?.toISOString() || null,
            end: existingProject?.end?.toISOString() || null,
            status: existingProject?.status,
            users: existingProject?.users || [],
        },
    })

    return (
        <IonPage id='save-timentry'>
            <ToolBar title='Project' />
            <IonContent>
                <form onSubmit={handleSubmit(save)}>
                    <TextField
                        control={control}
                        errors={errors}
                        key='name'
                        label='Name'
                        name='name'
                        type='text'
                    />

                    <SelectField
                        control={control}
                        errors={errors}
                        key='status'
                        label='Status'
                        name='status'
                        options={statusOptions}
                    />

                    <InputTagField
                        control={control}
                        errors={errors}
                        key='users'
                        label='Members'
                        name='users'
                    />

                    <DateField
                        control={control}
                        displayFormat='MMM D, YYYY'
                        errors={errors}
                        key='startTime'
                        label='Start Date'
                        name='start'
                    />

                    <DateField
                        control={control}
                        errors={errors}
                        key='endTime'
                        label='End Date'
                        name='end'
                    />
                    <TextArea
                        control={control}
                        errors={errors}
                        key='description'
                        label='Description'
                        name='description'
                    />
                    <IonButton className='ion-padding' expand='block' type='submit'>
                        Save
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default SaveProject
