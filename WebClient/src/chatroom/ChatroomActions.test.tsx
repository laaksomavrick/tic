import { render } from '@testing-library/react';
import { ChatroomActions } from './ChatroomActions';

describe('ChatroomActions', () => {
    it('can render', () => {
        const { getByTestId } = render(<ChatroomActions />);

        const actions = getByTestId('ChatroomActions');

        expect(actions).toBeInTheDocument();
    });

    // TODO: more tests as functionality is added
});
