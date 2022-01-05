import { FlexProps } from '@chakra-ui/react';
import { TicText } from '../common/TicText';
import { RoomListButton } from './RoomListButton';

export interface RoomListCreateRoomButtonProps extends FlexProps {}

export const RoomListCreateRoomButton: React.FC<
    RoomListCreateRoomButtonProps
> = ({ ...rest }) => {
    return (
        <RoomListButton
            data-testid="RoomListCreateRoomButton"
            alignItems="center"
            justifyContent="center"
            border="1px dotted"
            {...rest}
        >
            <TicText fontSize={['xl']} fontWeight={'semibold'}>
                Create Room
            </TicText>
        </RoomListButton>
    );
};
