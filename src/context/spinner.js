import { createContext, useState } from 'react';

const SpinnerContext = createContext({});

export function SpinnerContextProvider({children}) {
    const spinnerState = useState({});

    return <SpinnerContext.Provider
        value={spinnerState}
    >
        {children}
    </SpinnerContext.Provider>
}

export default SpinnerContext;
