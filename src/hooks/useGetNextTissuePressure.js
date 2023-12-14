import { useGetUserSettings } from './useGetUserSettings';

export const useGetNextTissuePressure = () => {
    const { userSettings } = useGetUserSettings();
    const nitrogen_frac = userSettings.gasPercentNitrogen / 100;
    const helium_frac = userSettings.gasPercentHelium / 100;
    const simulatedTimeStep = userSettings.simulatedTimeStep;

    const getNextTissuePressure = (
        current_pressure,
        amb_pressure,
        half_life
    ) => {
        const gas_pressure = nitrogen_frac * amb_pressure;
        const p = current_pressure +
            (gas_pressure - current_pressure) *
            (1 - (1/2) ** (simulatedTimeStep/half_life));
        return p;
    }
    return { getNextTissuePressure };
}

export default useGetNextTissuePressure;