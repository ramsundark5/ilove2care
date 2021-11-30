import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { IonToast, ToastOptions } from '@ionic/react'
import { ReactControllerProps } from '@ionic/react/dist/types/components/createControllerComponent'

type ReactToastOptions = ToastOptions & Partial<ReactControllerProps>

type ToastInstance = {
    present: (options?: ReactToastOptions) => void
    dismiss: () => void
}

type ToastObject = {
    ref: HTMLIonToastElement | null
    isOpen: boolean
    options: ReactToastOptions
}

type ToastProviderOptions = {
    create: (options: ReactToastOptions) => ToastInstance
    success: (message: string) => ToastInstance
    error: (message: string) => ToastInstance
    warning: (message: string) => ToastInstance
}

const ToastContext = createContext<ToastProviderOptions | null>(null)
const { Provider } = ToastContext

interface Props {
    // eslint-disable-next-line react/require-default-props
    value?: ToastOptions
}

export const useToast = () => useContext(ToastContext) as ToastProviderOptions

export const ToastProvider: FC<Props> = ({ value, children }) => {
    const [toasts, setToasts] = useState([] as ToastObject[])

    const create = useCallback(
        (options: ReactToastOptions) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const present = (options: ReactToastOptions) => () => {
                // don't display another toast if a matching message is already displayed
                if (
                    toasts.filter((toast) => toast.options.message === options.message).length > 0
                ) {
                    return
                }

                const newToast: ToastObject = {
                    ref: null,
                    options: {
                        ...value,
                        ...options,
                    },
                    isOpen: true,
                }

                setToasts([...toasts, newToast])
            }

            const dismiss = () => {
                // actually dismisses ALL
                setToasts(toasts.map((toast) => ({ ...toast, isOpen: false })))
            }

            return {
                present: present(options),
                dismiss,
            }
        },
        [toasts, value]
    )

    useEffect(() => {
        // clear all toasts if none of them are visible.
        if (toasts.length > 0) {
            const openToasts = toasts.filter((toast) => toast.isOpen)
            if (openToasts.length < 1) {
                setToasts([])
            }
        }
    }, [toasts])

    const contextValue = useMemo(() => {
        const translateToOptions =
            (color: 'success' | 'warning' | 'danger') => (message: string) => {
                const toast = create({ message, color })
                toast.present()
                return toast
            }

        return {
            create,
            success: translateToOptions('success'),
            error: translateToOptions('danger'),
            warning: translateToOptions('warning'),
        }
    }, [create])

    const hideToast = (index: number) => {
        // eslint-disable-next-line max-len
        setToasts([
            ...toasts.map((toast, i) => (i === index ? { ...toast, isOpen: false } : toast)),
        ])
    }

    return (
        <Provider value={contextValue}>
            {children}
            {toasts.map((toast, i) => (
                <IonToast
                    isOpen={toast.isOpen}
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    onDidDismiss={() => hideToast(i)}
                    // eslint-disable-next-line no-return-assign
                    ref={(ref) => (toasts[i].ref = ref)}
                    {...toast.options}
                />
            ))}
        </Provider>
    )
}
