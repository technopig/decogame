import useGetUserSettings from "./useGetUserSettings";


const useGetConstants = () => {
    const { userSettings }  = useGetUserSettings();
    const saturatedTissuePressureNitrogen = userSettings.gasPercentNitrogen / 100;
    const saturatedTissuePressureHelium = userSettings.gasPercentHelium / 100;
    const CONSTANTS = {
        nitrogen: {
            half_life: {
                c1: 4,
                c2: 8,
                c3: 12.5,
                c4: 18.5
            },
            a: {
                c1: 1.2599,
                c2: 1.0000,
                c3: 0.8618,
                c4: 0.7562
            },
            b: {
                c1: 0.5050,
                c2: 0.6514,
                c3: 0.7222,
                c4: 0.7825
            }
        },
        helium: {
            half_life: {
                c1: 1.6,
                c2: 2.0
            },
            a: {
                c1: 0.6454,
                c2: 0.8546
            }
        }
    }
    
    const DEFAULT_CHART_DATA = [{ // array of length 1 with initial values in it
        diveTime: 0,
        depthLine: 0,
        ambientPressureLine: 1,
        c1: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c2: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c3: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c4: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c5: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c6: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c7: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c8: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c9: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c10: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c11: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c12: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c13: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c14: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c15: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        },
        c16: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 1
        }
        // c2: {},
        // c3: {},
        // nitrogenCpt2Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt3Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt4Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt5Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt6Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt7Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt8Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt9Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt10Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt11Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt12Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt13Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt14Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt15Line: saturatedTissuePressureNitrogen,
        // nitrogenCpt16Line: saturatedTissuePressureNitrogen,
        // mValueLine: 1
    }];
    return { CONSTANTS, DEFAULT_CHART_DATA };
}



export default useGetConstants;