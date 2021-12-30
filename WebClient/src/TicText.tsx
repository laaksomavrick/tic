import { TextProps, Text } from '@chakra-ui/react';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from './common-styles';

export const TicText: React.FC<TextProps> = ({ children, ...rest }) => {
    return (
        <Text _selection={{ ...TIC_BACKGROUND_COLOR_AND_TEXT }} {...rest}>
            {children}
        </Text>
    );
};
