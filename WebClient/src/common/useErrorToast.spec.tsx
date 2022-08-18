import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { useErrorToast } from './useErrorToast';

const TestComponent: React.FC = () => {
    useErrorToast({ data: {}, message: '' });

    return (
        <ChakraProvider>
            <></>
        </ChakraProvider>
    );
};

describe('useErrorToast', () => {
    it('displays an error toast', () => {
        render(<TestComponent />);

        const errorTitle = screen.getByText('Oops! Something went wrong');

        expect(errorTitle).toBeInTheDocument();
    });
});
