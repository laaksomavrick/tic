import { TextProps, Text } from '@chakra-ui/react';

export const TicText: React.FC<TextProps> = ({ children, ...rest }) => {
    return (
        <Text _selection={{ background: 'purple.400', color: 'white' }} {...rest}>
            {children}
        </Text>
    );
};
