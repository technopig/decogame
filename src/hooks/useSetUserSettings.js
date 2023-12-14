import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

export const useSetUserSettings = () => {
    const { userId } = useGetUserInfo();

    // function to update settings - return this function
    const updateSettings = async (
        //default settings
        { 
            maxDepth = 300,
            chartUpdateIntervalMS = 25,
            gasPercentHelium = 0,
            gasPercentNitrogen = 79,
            gasPercentOxygen = 21,
            simulatedTimeStep = 2, // time in seconds each step (simulated)
            linesConfig = {
                depthLine: { stroke: '#8884d8', visible: true, yAxisId: 'feet'},
                ambientPressureLine: { stroke: '#744700', visible: true, yAxisId: 'ATM'},
                nitrogenCpt1Line: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                nitrogenCpt2Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt3Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt4Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt5Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt6Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt7Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt8Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt9Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt10Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt11Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt12Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt13Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt14Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt15Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                nitrogenCpt16Line: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
            }
        } // end of default settings object
    ) => {
        const docRef = await doc(db, "user-configs", userId);
        const response = await setDoc(docRef, {
            userId,
            maxDepth,
            chartUpdateIntervalMS,
            gasPercentHelium,
            gasPercentNitrogen,
            gasPercentOxygen,
            simulatedTimeStep,
            updatedAt: serverTimestamp(),
            linesConfig
        });
        return response;
    };
    return { updateSettings };
}

export default useSetUserSettings;