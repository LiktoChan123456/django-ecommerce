import { useEffect, useState } from "react";
import { setUser } from '../utils/auth';
import React from 'react'


// prevent users to access the children component when loading is not completed
const MainWrapper = ({children}) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const handler = async () => {
            setLoading(true)
            await setUser()
            setLoading(false)

        }
        handler()
    }, [])
    return <>{loading ? null : children}</>
    

}

export default MainWrapper
