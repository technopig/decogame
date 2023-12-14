import { useState } from "react";
import { useSetUserSettings } from "../../hooks/useSetUserSettings";
import { useGetUserSettings } from "../../hooks/useGetUserSettings";
import "../../App.css";

const SettingsPane = () => {

    // hooks
    const { updateSettings } = useSetUserSettings();
    const { userSettings } = useGetUserSettings();
    // const [ currentUserSettings, setCurrentUserSettings ] = useState({});
    const [ chartUpdateIntervalMS, setChartUpdateIntervalMS ] = useState(100);
    const [ gasPercentHelium, setGasPercentHelium ] = useState(0);
    const [ gasPercentNitrogen, setGasPercentNitrogen ] = useState(79);
    const [ gasPercentOxygen, setGasPercentOxygen ] = useState(21);
    const [ simulatedTimeStep, setSimulatedTimeStep ] = useState(2);
    const [ maxDepth, setMaxDepth ] = useState(130);

    // methods
    const onSubmit = async (e) => {
        e.preventDefault();
        updateSettings({
            maxDepth: maxDepth,
            chartUpdateIntervalMS: parseFloat(chartUpdateIntervalMS),
            gasPercentHelium: parseFloat(gasPercentHelium),
            gasPercentNitrogen: parseFloat(gasPercentNitrogen),
            gasPercentOxygen: parseFloat(gasPercentOxygen),
            simulatedTimeStep: parseFloat(simulatedTimeStep)
        });
    };
    return (
    <div className="settings-pane">
        <h3> Settings </h3>
        <form onSubmit={onSubmit}>
            <label htmlFor="max-depth">Max Depth (ft)
                <input 
                    type="float"
                    name="Max Depth"
                    id="max-depth"
                    onChange={(e) => setMaxDepth(e.target.value)}
                />
            </label>
            <label htmlFor="update-interval">Chart Update Interval (ms)
                <input 
                    type="float"
                    name="Update Interval"
                    id="update-interval"
                    onChange={(e) => setChartUpdateIntervalMS(e.target.value)}
                />
            </label>
            <label>Helium Gas Percent
                <input
                    type="float"
                    name="Helium Gas Percent"
                    id="gas-percent-helium"
                    onChange={(e) => setGasPercentHelium(e.target.value)}
                />
            </label>
            <label>Nitrogen Gas Percent
                <input
                    type="float"
                    name="Nitrogen Gas Percent"
                    id="gas-percent-nitrogen"
                    onChange={(e) => setGasPercentNitrogen(e.target.value)}
                />
            </label>
            <label>Oxygen Gas Percent
                <input
                    type="float"
                    name="Oxygen Gas Percent"
                    id="gas-percent-oxygen"
                    onChange={(e) => setGasPercentOxygen(e.target.value)}
                />
            </label>
            <label>Simulated Time Step (s)
                <input
                    type="float"
                    name="Simulated Time Step"
                    id="simulated-time-step"
                    onChange={(e) => setSimulatedTimeStep(e.target.value)}
                />
            </label>
            <button type="submit">Save Settings</button>
        </form>
        <h3>Current Settings</h3>
        <ul className="settingsList">
            <li>Max Depth: { userSettings.maxDepth } ft </li>
            <li>Update Interval: { userSettings.chartUpdateIntervalMS } ms </li>
            <li>Gas Percent Helium: { userSettings.gasPercentHelium } %</li>
            <li>Gas Percent Nitrogen: { userSettings.gasPercentNitrogen } %</li>
            <li>Gas Percent Oxygen: { userSettings.gasPercentOxygen } %</li>
            <li>Simulated Time Step: { userSettings.simulatedTimeStep } s</li>
            {/* <li>Lines Config: {userSettings.linesConfig } </li> */}
        </ul>
    </div>
    );
}

export default SettingsPane;