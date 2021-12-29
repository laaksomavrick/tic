import { HeadingProps, Heading } from '@chakra-ui/react';

export const TicHeading: React.FC<HeadingProps> = ({ children, ...rest }) => {
    return (
        <Heading _selection={{ background: 'purple.400', color: 'white' }} mb={[4]} {...rest}>
            {children}
        </Heading>
    );
};
