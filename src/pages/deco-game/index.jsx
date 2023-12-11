import { signOut } from "firebase/auth";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const DecoGame = () => {
    // hooks
    const { userEmail, userId, token, isAuth } = useGetUserInfo();
    const navigate = useNavigate();


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
            <div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    )
}