import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'
import { date, number, object, string } from 'yup'

import DateField from '../../components/DateField'
import InputTagField from '../../components/InputTagField'
import SelectField, { SelectFieldOptionProps } from '../../components/SelectField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IProject } from '../project/models/IProject'
import DeleteTimesheetAlert from './DeleteCreditAlert'
import { ICredit } from './models/ICredit'

interface SaveCreditProps
    extends RouteComponentProps<{
        creditId: string
    }> {}

const SaveCredit: React.FC<SaveCreditProps> = ({ history, match }) => {
    const { projectStore, creditStore } = useStore()
    const existingCredit = creditStore.list.find((item) => item.id === match.params.creditId)
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
            log.info('loaded user credit list in SaveCredit')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [didLoad])

    const saveCredit = (credit: ICredit) => {
        try {
            if (existingCredit && existingCredit.id) {
                creditStore.updateCredit(credit, existingCredit.id)
            } else {
                creditStore.addCredit(credit)
            }
            history.goBack()
        } catch (err) {
            log.error(err)
        }
    }

    const removeCredit = () => {
        if (!existingCredit) {
            return
        }
        setShowAlert(false)
        creditStore.removeCredit(existingCredit)
        history.goBack()
    }

    const onSaveClick = () => {
        if (hiddenSubmitBtnRef.current) {
            hiddenSubmitBtnRef.current.click()
        }
    }

    const validationSchema = object().shape({
        title: string().required('Title is required'),
        start: date().nullable().default(undefined),
        end: date().nullable().default(undefined),
        note: string(),
        projectId: string().required('Project selection is required'),
        credit: number().required(),
    })
    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: existingCredit?.title,
            start: existingCredit?.start?.toISOString() || null,
            end: existingCredit?.end?.toISOString() || null,
            note: existingCredit?.note,
            projectId: existingCredit?.projectId,
            users: existingCredit?.users || [],
            credit: existingCredit?.credit || null,
        },
    })

    return (
        <IonPage id='save-credit'>
            <ToolBar backHref='/tabs/timesheet' title='Credit' />
            <IonContent>
                <form id='creditForm' onSubmit={handleSubmit(saveCredit)}>
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

                    <TextField
                        control={control}
                        errors={errors}
                        key='credit'
                        label='Credits'
                        name='credit'
                        type='text'
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
                    confirmationAction={() => removeCredit()}
                    showAlert={showAlert}
                />
            </IonContent>
            <IonFooter className='ion-margin-bottom ion-no-border'>
                <IonButton className='ion-padding' expand='block' onClick={() => onSaveClick()}>
                    Save
                </IonButton>
                <button
                    aria-label='Hidden submit'
                    form='creditForm'
                    hidden
                    id='submitBtn'
                    ref={hiddenSubmitBtnRef}
                    type='submit'
                />
                {existingCredit && existingCredit.id && (
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

export default SaveCredit
