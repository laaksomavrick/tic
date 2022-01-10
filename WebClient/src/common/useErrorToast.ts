import { ToastId, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GetDataError } from 'restful-react';

export const useErrorToast = (error: GetDataError<unknown> | null) => {
    const [toastId, setToastId] = useState<ToastId | undefined>(undefined);

    const toast = useToast({
        title: 'Oops! Something went wrong',
        description: 'Tic is experiencing an issue. Please try again later.',
        status: 'error',
        isClosable: true,
    });

    useEffect(() => {
        if (error && toastId == null) {
            const toastId = toast();
            setToastId(toastId);
        }
    }, [error, toast, toastId, setToastId]);
};
