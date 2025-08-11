import React, { createContext, useState } from 'react'

export const Submission = createContext();

export const SubmissionProvider = ({ children }) => {
    const [adoptionSubmissions, setAdoptionSubmissions] = useState([]);
    const [rescuseSubmissions, setRescueSubmissions ] = useState([]);
    return(
        <Submission.Provider 
        value={{ adoptionSubmissions,
             setAdoptionSubmissions,
            rescuseSubmissions, 
            setRescueSubmissions
        }} >
            {children}
        </Submission.Provider>
    )
}

