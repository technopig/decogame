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
            },
            c5:{
                half_life: 27,
                a: 0.6200,
                b: 0.8126
            },
            c6:{
                half_life: 38.3,
                a: 0.5043,
                b: 0.8434
            },
            c7:{
                half_life: 54.3,
                a: 0.4410,
                b: 0.8693
            },
            c8:{
                half_life: 77,
                a: 0.4000,
                b: 0.8910
            },
            c9:{
                half_life: 109,
                a: 0.3750,
                b: 0.9092
            },
            c10:{
                half_life: 146,
                a: 0.3500,
                b: 0.9222
            },
            c11:{
                half_life: 187,
                a: 0.3295,
                b: 0.9319
            },
            c12:{
                half_life: 239,
                a: 0.3065,
                b: 0.9403
            },
            c13:{
                half_life: 305,
                a: 0.2835,
                b: 0.9477
            },
            c14:{
                half_life: 290,
                a: 0.2610,
                b: 0.9544
            },
            c15:{
                half_life: 498,
                a: 0.2480,
                b: 0.9602
            },
            c16:{
                half_life: 635,
                a: 0.2327,
                b: 0.9653
            }
        },
        helium: {
            c1: {
                half_life: 1.51,
                a: 1.7474,
                b: 0.4245
            },
            c2: {
                half_life: 3.02,
                a: 1.3830,
                b: 0.5747
            },
            c3: {
                half_life: 4.72,
                a: 1.1919,
                b: 0.6527
            },
            c4:{
                half_life: 6.99,
                a: 1.048,
                b: 0.7223
            },
            c5:{
                half_life: 10.21,
                a: 0.9220,
                b: 0.7582
            },
            c6:{
                half_life: 14.48,
                a: 0.8205,
                b: 0.7957
            },
            c7:{
                half_life: 20.53,
                a: 0.7305,
                b: 0.8279
            },
            c8:{
                half_life: 29.11,
                a: 0.6502,
                b: 0.8553
            },
            c9:{
                half_life: 41.2,
                a: 0.5950,
                b: 0.8757
            },
            c10:{
                half_life: 55.19,
                a: 0.5545,
                b: 0.8903
            },
            c11:{
                half_life: 70.69,
                a: 0.5333,
                b: 0.8997
            },
            c12:{
                half_life: 90.34,
                a: 0.5189,
                b: 0.9073
            },
            c13:{
                half_life: 115.29,
                a: 0.5181,
                b: 0.9122
            },
            c14:{
                half_life: 147.42,
                a: 0.5176,
                b: 0.9171
            },
            c15:{
                half_life: 188.24,
                a: 0.5172,
                b: 0.9217
            },
            c16:{
                half_life: 240.03,
                a: 0.5119,
                b: 0.9267
            }
        }
    }
    
    const DEFAULT_CHART_DATA = [{ // array of length 1 with initial values in it
        diveTime: 0,
        depthLine: 0,
        ambientPressureLine: 1,
        controllingMValueLine: 1,
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
    }];
    return { CONSTANTS, DEFAULT_CHART_DATA };
}



export default useGetConstants;