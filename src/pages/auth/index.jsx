import { auth, provider } from "../../config/firebase-config";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import './styles.css';

export const Auth = () => {

    const navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");

    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    
    const [loginPassword, setLoginPassword] = useState("");
    
    //const { isAuth } = useGetUserInfo();

    // function to register new user
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log("user: ", user);
        } catch (err) {
            console.error(err);
        }
        setRegisterEmail("");
        setRegisterPassword("");
    };

    const login = async () => {


    };

    const logout = async () => {

    };

    // if (isAuth) {
    //     return <Navigate to="/deco-game" />;
    // }

    // const signInWithGoogle = async () => {
    //     const results = await signInWithPopup(auth, provider);
    //     const authInfo = {
    //         userId: results.user.uid,
    //         displayName: results.user.displayName,
    //         profilePhoto: results.user.photoURL,
    //         isAuth: true
    //     };
    //     localStorage.setItem("auth", JSON.stringify(authInfo));
    //     navigate("/deco-game");
    // };
    

    return (
        <div className="login-page">
            {/* <div className="google-login">
                <p> Sign in with Google to continue. </p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>
                    Sign in with Google.
                </button>
            </div> */}
            <div className="register-user">
                <h3> Register User </h3>
                <input 
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={registerPassword}
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                <button onClick={register}> Create User </button>
            </div>
            <div className="login-user">
                <h3> Login </h3>
                <input 
                    placeholder="Email"
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password"
                    type="password"
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />
                <button
                    onClick={login}
                > Create User </button>
            </div>
            <div>
                <h3> User Info </h3>
                <p> {/*put user info here */} </p> 
            </div>

        </div>
    );
};