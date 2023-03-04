import {createContext, useEffect, useState} from 'react';

const defaultValues = {
    status: 'loading'
};
const ActivityDataContext = createContext(defaultValues);

export function ActivityDataProvider({children}) {
    const [activityData, setActivityData] = useState(defaultValues);

    return <ActivityDataContext.Provider
        value={{
            activityData,
            setActivityData
        }}
    >
        {children}
    </ActivityDataContext.Provider>
}

export default ActivityDataContext;
