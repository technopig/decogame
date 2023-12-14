import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import useSetUserSettings from "../../hooks/useSetUserSettings";
// import './styles.css';





export const SignUp = () => {

    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { updateSettings } = useSetUserSettings();

    // hooks
    const navigate = useNavigate();

    // handle submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("in handleSubmit");
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const authInfo = {
                userId: user.uid,
                userEmail: user.email,
                isAuth: true
            };
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('auth', JSON.stringify(authInfo));

            updateSettings({
                chartUpdateIntervalMS: 50,
                gasPercentHelium: 0,
                gasPercentNitrogen: 79,
                gasPercentOxygen: 21
            });
            
            navigate("/deco-game");
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <div>
            <h3> Register New User </h3>
            <form onSubmit={handleSubmit} className='signup-form'>
                <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />  {/*<br />*/}
                <input
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit" className='signup-button'>Sign Up!</button>
            </form>
            <p>Go to <Link to="/">Login Page</Link></p>
        </div>
    );
}