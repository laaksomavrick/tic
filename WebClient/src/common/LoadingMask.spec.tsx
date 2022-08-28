import { render, screen } from '@testing-library/react';
import { UserContext } from '../user/UserContext';
import { LoadingMask } from './LoadingMask';
import { ConnectionContext } from '../ConnectionContext';

describe('LoadingMask', () => {
    it('shows a loading spinner', () => {
        render(
            <UserContext.Provider
                value={{ user: null, loading: true, error: null }}
            >
                <LoadingMask />
            </UserContext.Provider>,
        );

        const mask = screen.getByTestId('LoadingMask');

        expect(mask).toBeInTheDocument();
    });

    it('shows children', () => {
        render(
            <ConnectionContext.Provider
                value={{ connection: {}, loading: false, error: null } as any}
            >
                <UserContext.Provider
                    value={{ user: null, loading: false, error: null }}
                >
                    <LoadingMask>
                        <div data-testid="child"></div>
                    </LoadingMask>
                </UserContext.Provider>
                ,
            </ConnectionContext.Provider>,
        );

        const child = screen.getByTestId('child');

        expect(child).toBeInTheDocument();
    });
});
