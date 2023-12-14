import { signOut } from "firebase/auth";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Plot from "../../components/plot/Plot";
import SettingsPane from "../../components/settings-pane/SettingsPane";
import "../../App.css";

export const DecoGame = () => {
    // hooks
    const { userEmail, userId, token, isAuth } = useGetUserInfo();
    const navigate = useNavigate();

    if (!isAuth) {
        return <div>
            <p>You're not signed in.</p>
            <Link to="/">Go home.</Link>
        </div>
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('auth');
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="user-info">
                <p>Email: {userEmail} </p>
                <p>uid: {userId} </p>
                <p>token: {token} </p>
            </div>
            <div>
                <h3>Welcome to DecoGame!</h3>
            </div>
            <div className="game-and-settings-area">
                <Plot />
                <SettingsPane />
            </div>
            <div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    )
}