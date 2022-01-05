import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field, useFormikContext } from 'formik';

export interface RoomListCreateRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateRoom: (name: string) => Promise<void>;
    isLoading: boolean;
}

export const RoomListCreateRoomModal: React.FC<
    RoomListCreateRoomModalProps
> = ({ isOpen, onClose, onCreateRoom, isLoading }) => {
    const onSubmit = ({ name }: { name: string }) => {
        onCreateRoom(name);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <Formik initialValues={{ name: '' }} onSubmit={onSubmit}>
                {({ isValid, isSubmitting }) => (
                    <CreateRoomModalContent
                        onClose={onClose}
                        isValid={isValid}
                        isSubmitting={isLoading}
                    />
                )}
            </Formik>
        </Modal>
    );
};

const CreateRoomModalContent: React.FC<{
    onClose: () => void;
    isValid: boolean;
    isSubmitting: boolean;
}> = ({ onClose, isValid, isSubmitting }) => {
    const { submitForm } = useFormikContext();
    return (
        <ModalContent>
            <ModalHeader>Create Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Form>
                    <Field name="name" validate={validateName}>
                        {/* @ts-ignore */}
                        {({ field, form }) => (
                            <FormControl
                                isInvalid={
                                    form.errors.name && form.touched.name
                                }
                            >
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    placeholder="Enter a room name..."
                                    autoFocus
                                />
                                <FormErrorMessage>
                                    {form.errors.name}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button
                    variant="outline"
                    mr="auto"
                    onClick={onClose}
                    type="submit"
                >
                    Close
                </Button>
                <Button
                    variant="solid"
                    colorScheme="purple"
                    onClick={submitForm}
                    isDisabled={isValid === false}
                    isLoading={isSubmitting}
                >
                    Create
                </Button>
            </ModalFooter>
        </ModalContent>
    );
};

const validateName = (value: string): string | undefined => {
    let error = undefined;
    if (value == null || value === '') {
        error = 'Name is required';
    }
    return error;
};
