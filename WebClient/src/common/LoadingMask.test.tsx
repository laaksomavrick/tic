import { render } from "@testing-library/react"
import { UserContext } from "../user/UserContext"
import { LoadingMask } from "./LoadingMask"

describe('LoadingMask', () => {
    it('shows a loading spinner', () => {
        const { getByTestId } = render(
            <UserContext.Provider value={{ user: null, loading: true, error: null}}>
                <LoadingMask />
            </UserContext.Provider>
        )

        const mask = getByTestId('LoadingMask');
        
        expect(mask).toBeInTheDocument();
    })

    it('shows children', () => {
        const { getByTestId } = render(
            <UserContext.Provider value={{ user: null, loading: false, error: null}}>
                <LoadingMask>
                    <div data-testid="child"></div>
                </LoadingMask>
            </UserContext.Provider>
        )

        const child = getByTestId('child');
        
        expect(child).toBeInTheDocument();
    })
})