import { GetDataError } from 'restful-react';

/**
 * Factory function intended for use in tests for mocking the return value
 * of a mutator provided via the restful-react generated hooks
 */
export const mutateMockReturnValueFactory =
    ({
        mutate = jest.fn(),
        loading = false,
        error = null,
    }: {
        mutate?: () => Promise<any>;
        loading?: boolean;
        error?: GetDataError<unknown> | null;
    }) =>
    () => ({
        mutate,
        loading,
        error,
    });

/**
 * Factory function intended for use in tests for mocking the return value
 * of a getter provided via the restful-react generated hooks
 */
export const getMockReturnValueFactory =
    ({
        data = {},
        loading = false,
        error = null,
    }: {
        data?: any;
        loading?: boolean;
        error?: GetDataError<unknown> | null | undefined;
    }) =>
    () => ({
        data,
        loading,
        error,
    });
