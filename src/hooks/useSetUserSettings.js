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
                leadingMValueLine: { stroke: '#FF7400', visible: true, yAxisId: 'ATM'},
                c1: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c2: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c3: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c4: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c5: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c6: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c7: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c8: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: true, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: true, yAxisId: 'ATM'}
                },
                c9: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                },
                c10: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                },
                c11: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                },
                c12: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                },
                c13: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                },
                c14: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                },
                c15: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                },
                c16: {
                    nitrogenLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM'},
                    heliumLine: { stroke: '#b6d7a8', visible: false, yAxisId: 'ATM' },
                    mValueLine: {stroke: '#cc0000', visible: false, yAxisId: 'ATM'}
                }
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