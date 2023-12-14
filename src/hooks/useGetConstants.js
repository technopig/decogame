import useGetUserSettings from "./useGetUserSettings";


const useGetConstants = () => {
    const { userSettings }  = useGetUserSettings();
    const saturatedTissuePressureNitrogen = userSettings.gasPercentNitrogen / 100;
    const saturatedTissuePressureHelium = userSettings.gasPercentHelium / 100;
    const CONSTANTS = {
        nitrogen: {
            c1: {
                half_life: 4,
                a: 1.2599,
                b: 0.5050
            },
            c2: {
                half_life: 8,
                a: 1.0000,
                b: 0.6514
            },
            c3: {
                half_life: 12.5,
                a: 0.8618,
                b: 0.7222
            },
            c4:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            }
        },
        helium: {
            c1: {
                half_life: 1.5,
                a: 1.74375,
                b: 0.1911
            },
            c2: {
                half_life: 3.0,
                a: 1.3838,
                b: 0.4295
            },
            c3: {
                half_life: 4.7,
                a: 1.1925,
                b: 0.5446
            },
            c4:{
                half_life: 7.0,
                a: 1.0465,
                b: 0.6265
            }
        }
    }
    
    const DEFAULT_CHART_DATA = [{ // array of length 1 with initial values in it
        diveTime: 0,
        depthLine: 0,
        ambientPressureLine: 1,
        controllingMValueLine: 0,
        c1: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c2: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c3: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c4: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c5: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c6: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c7: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c8: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c9: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c10: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c11: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c12: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c13: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c14: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c15: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
        },
        c16: {
            nitrogenLine: saturatedTissuePressureNitrogen,
            heliumLine: saturatedTissuePressureHelium,
            mValueLine: 0
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