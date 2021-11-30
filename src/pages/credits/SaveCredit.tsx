import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouteComponentProps } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'
import { date, number, object, string } from 'yup'

import DateField from '../../components/DateField'
import MultiSelectTag from '../../components/MultiSelectTag'
import { SelectFieldOptionProps } from '../../components/SelectField'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import ToolBar from '../../components/ToolBar'
import { RouteEnum } from '../../constants/RouteEnum'
import { useStore } from '../../hooks/use-store'
import log from '../../logger'
import { IUser } from '../account/model/IUser'
import DeleteTimesheetAlert from './DeleteCreditAlert'
import { ICredit } from './models/ICredit'

interface SaveCreditProps
    extends RouteComponentProps<{
        projectId: string
        creditId: string
    }> {}

const SaveCredit: React.FC<SaveCreditProps> = ({ history, match }) => {
    const { creditStore, userStore } = useStore()
    const { projectId } = match.params
    const isFromAdmin = !!projectId
    const users: IUser[] = userStore.userList
    const creditStoreToSearch = isFromAdmin ? creditStore.projectCredits : creditStore.userCredits
    const existingCredit = creditStoreToSearch.find((item) => item.id === match.params.creditId)
    const [showAlert, setShowAlert] = useState(false)
    const hiddenSubmitBtnRef: any = useRef()

    const userOptions: SelectFieldOptionProps[] = []
    for (const user of users) {
        userOptions.push({ label: user.name, value: user.email })
    }
    const saveCredit = (credit: ICredit) => {
        try {
            const updatedCredit: ICredit = { ...credit }
            updatedCredit.projectId = projectId
            if (existingCredit && existingCredit.id) {
                creditStore.updateCredit(updatedCredit, existingCredit.id)
            } else {
                creditStore.addCredit(updatedCredit)
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
        credit: number().required(),
    })

    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: existingCredit?.title,
            start: existingCredit?.start?.toISOString() || null,
            end: existingCredit?.end?.toISOString() || null,
            note: existingCredit?.note,
            users: existingCredit?.users || [],
            credit: existingCredit?.credit || null,
        },
    })

    return (
        <IonPage id='save-credit'>
            <ToolBar backHref={RouteEnum.CREDITS} title='Credit' />
            <IonContent>
                <form id='creditForm' onSubmit={handleSubmit(saveCredit)}>
                    <TextField
                        control={control}
                        errors={errors}
                        key='title'
                        label='Title'
                        name='title'
                        readonly={!isFromAdmin}
                        type='text'
                    />

                    <TextField
                        control={control}
                        errors={errors}
                        key='credit'
                        label='Credits'
                        name='credit'
                        readonly={!isFromAdmin}
                        type='text'
                    />

                    <MultiSelectTag
                        control={control}
                        errors={errors}
                        key='users'
                        label='Members'
                        name='users'
                        options={userOptions}
                        readonly={!isFromAdmin}
                    />

                    <DateField
                        control={control}
                        errors={errors}
                        key='startTime'
                        label='Start Time'
                        name='start'
                        readonly={!isFromAdmin}
                    />

                    <DateField
                        control={control}
                        errors={errors}
                        key='endTime'
                        label='End Time'
                        name='end'
                        readonly={!isFromAdmin}
                    />
                    <TextArea
                        control={control}
                        errors={errors}
                        key='note'
                        label='Note'
                        name='note'
                        readonly={!isFromAdmin}
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
