import { HeadingProps, Heading } from '@chakra-ui/react';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from './common-styles';

export const TicHeading: React.FC<HeadingProps> = ({ children, ...rest }) => {
    return (
        <Heading
            _selection={{ ...TIC_BACKGROUND_COLOR_AND_TEXT }}
            mb={[4]}
            {...rest}
        >
            {children}
        </Heading>
    );
};
