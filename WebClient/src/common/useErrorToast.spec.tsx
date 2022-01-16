import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
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
        const { getByText } = render(<TestComponent />);

        const errorTitle = getByText('Oops! Something went wrong');

        expect(errorTitle).toBeInTheDocument();
    });
});
