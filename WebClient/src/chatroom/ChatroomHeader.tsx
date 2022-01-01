import {
    Flex,
    FlexProps,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from '@chakra-ui/react';
import { TicHeading } from '../common/TicHeading';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, InfoOutlineIcon, ViewIcon } from '@chakra-ui/icons';

export interface ChatroomHeaderProps extends FlexProps {
    name: string;
    onClickBackButton: () => void;
}

export const ChatroomHeader: React.FC<ChatroomHeaderProps> = ({
    name,
    onClickBackButton,
    ...rest
}) => {
    return (
        <Flex
            data-testid="ChatroomHeader"
            borderBottom="1px solid"
            borderColor="gray.400"
            justifyContent="space-between"
            alignItems="center"
            maxW="100%"
            overflowX="auto"
            pb={[2]}
            {...rest}
        >
            <IconButton
                onClick={onClickBackButton}
                aria-label="back-button"
                variant="ghost"
                icon={<ArrowBackIcon />}
                m={[1]}
            />
            <TicHeading fontSize="md" isTruncated mb={[0]}>
                {name}
            </TicHeading>
            <Popover placement="left-start">
                <PopoverTrigger>
                    <IconButton
                        aria-label="users-button"
                        variant="ghost"
                        icon={<InfoOutlineIcon />}
                        m={[1]}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverHeader>Users</PopoverHeader>
                    <PopoverBody></PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};
