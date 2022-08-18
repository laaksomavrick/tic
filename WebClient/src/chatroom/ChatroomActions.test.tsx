import { render, screen } from '@testing-library/react';
import { ChatroomActions } from './ChatroomActions';

describe('ChatroomActions', () => {
    it('can render', () => {
        render(<ChatroomActions />);

        const actions = screen.getByTestId('ChatroomActions');

        expect(actions).toBeInTheDocument();
    });

    // TODO: more tests as functionality is added
});
