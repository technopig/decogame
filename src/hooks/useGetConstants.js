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
            // c9:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // },
            // c10:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // },
            // c11:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // },
            // c12:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // },
            // c13:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // },
            // c14:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // },
            // c15:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // },
            // c16:{
            //     half_life: 18.5,
            //     a: 0.7562,
            //     b: 0.7825
            // }

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
            },
            c5:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c6:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c7:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c8:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c9:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c10:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c11:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c12:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c13:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c14:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c15:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
            },
            c16:{
                half_life: 18.5,
                a: 0.7562,
                b: 0.7825
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
        // c9: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // },
        // c10: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // },
        // c11: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // },
        // c12: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // },
        // c13: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // },
        // c14: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // },
        // c15: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // },
        // c16: {
        //     nitrogenLine: saturatedTissuePressureNitrogen,
        //     heliumLine: saturatedTissuePressureHelium,
        //     mValueLine: 0
        // }
    }];
    return { CONSTANTS, DEFAULT_CHART_DATA };
}



export default useGetConstants;