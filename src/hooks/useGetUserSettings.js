import { doc, onSnapshot } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react";



export const useGetUserSettings = () => {
    const { userId } = useGetUserInfo();
    const userSettingsDocRef = doc(db, "user-configs", userId);
    const [userSettings, setUserSettings] = useState({
        maxDepth: 130,
        chartUpdateIntervalMS: 50,
        gasPercentHelium: 0,
        gasPercentNitrogen: 79,
        gasPercentOxygen: 21,
        simulatedTimeStep: 2,
        linesConfig: {}
    });
    
    const getUserSettings = async () => {
        let unsubscribe;
        try {
            // const userSettingsDoc = getDoc(userSettingsDocRef);
            unsubscribe = onSnapshot(userSettingsDocRef, (doc) => {
                if(doc.data()) {
                    setUserSettings(doc.data());
                }
            })
            
        } catch (err) {
            console.error(err);
        }
        return () => unsubscribe();
        
    }

    useEffect(() => {
        getUserSettings();
    });

    return { userSettings };
}

export default useGetUserSettings;