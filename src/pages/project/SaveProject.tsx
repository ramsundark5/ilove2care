import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonFooter, IonItem, IonPage } from '@ionic/react'
import { date, object, string } from 'yup'

import DateField from '../../components/DateField'
import InputTagField from '../../components/InputTagField'
import SelectField, { SelectFieldOptionProps } from '../../components/SelectField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import { getPath } from '../../helpers/URLHelper'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import ArchiveProjectAlert from './ArchiveProjectAlert'
import { IProject } from './models/IProject'

interface SaveProjectProps
    extends RouteComponentProps<{
        id: string
    }> {}

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
const SaveProject: React.FC<SaveProjectProps> = ({ history, match }) => {
    const { projectStore } = useStore()
    const [showAlert, setShowAlert] = useState(false)
    const existingProject = projectStore.list.find((item) => item.id === match.params.id)
    const hiddenSubmitBtnRef: any = useRef()

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

    const onSaveClick = () => {
        if (hiddenSubmitBtnRef.current) {
            hiddenSubmitBtnRef.current.click()
        }
    }

    const archiveProject = () => {
        if (!existingProject) {
            return
        }
        setShowAlert(false)
        projectStore.archive(existingProject)
        history.goBack()
    }

    const validationSchema = object().shape({
        name: string().required('Project name is required'),
        start: date().nullable().default(undefined),
        end: date().nullable().default(undefined),
        description: string(),
        status: string(),
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
            admins: existingProject?.admins || [],
        },
    })

    return (
        <IonPage id='save-timentry'>
            <ToolBar backHref={RouteEnum.PROJECT} title='Project' />
            <IonContent>
                <form id='projectForm' onSubmit={handleSubmit(save)}>
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

                    <InputTagField
                        control={control}
                        errors={errors}
                        key='admins'
                        label='Admins'
                        name='admins'
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
                        displayFormat='MMM D, YYYY'
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
                </form>
                {existingProject && existingProject.id && (
                    <IonItem
                        detail
                        routerLink={getPath(RouteEnum.CREDITS, { projectId: existingProject?.id })}
                    >
                        Credits
                    </IonItem>
                )}
                <ArchiveProjectAlert
                    cancelAction={() => setShowAlert(false)}
                    confirmationAction={() => archiveProject()}
                    showAlert={showAlert}
                />
            </IonContent>
            <IonFooter className='ion-margin-bottom ion-no-border'>
                <IonButton className='ion-padding' expand='block' onClick={() => onSaveClick()}>
                    Save
                </IonButton>
                <button
                    aria-label='Hidden submit'
                    form='projectForm'
                    hidden
                    id='submitBtn'
                    ref={hiddenSubmitBtnRef}
                    type='submit'
                />
                {existingProject && existingProject.id && (
                    <IonButton
                        className='ion-padding'
                        color='danger'
                        expand='block'
                        onClick={() => setShowAlert(true)}
                    >
                        Archive
                    </IonButton>
                )}
            </IonFooter>
        </IonPage>
    )
}

export default SaveProject
