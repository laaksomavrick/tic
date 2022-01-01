import { Flex, FlexProps } from "@chakra-ui/react";
import { TIC_BACKGROUND_COLOR_AND_TEXT } from "../common/common-styles";
import { TicText } from "../common/TicText";

export interface RoomListItemProps extends FlexProps {
    room: any; // TODO
    onClickRoom: (roomId: string) => void
}

export const RoomListItem: React.FC<RoomListItemProps> = ({ room, onClickRoom, ...rest }) => {
    const id = room.id;
    return (
        <Flex
            data-testid={`RoomListItem-${id}`}
            onClick={() => onClickRoom(id)}
            direction="column"
            minH={'10em'}
            borderRadius="8px"
            border="1px solid"
            borderColor="gray.400"
            padding={[2]}
            cursor="pointer"
            _hover={{
                ...TIC_BACKGROUND_COLOR_AND_TEXT,
                borderColor: 'gray.50',
            }}
            {...rest}
        >
            <TicText fontSize={['xl']} fontWeight={'semibold'}>
                {room.name}
            </TicText>
        </Flex>
    );
};
