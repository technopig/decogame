import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {

    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // hooks
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

    if (isAuth) {
        return <Navigate to="/deco-game" />;
    }

    // handle submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("in handleSubmit");
        try {
            const userCredential = await signInWithEmailAndPassword(
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
            console.log(localStorage.getItem('auth'));
            navigate("/deco-game");
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <div>
            <h3> Sign In </h3>
            <form onSubmit={handleSubmit} className='login-form'>
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
                <button type="submit" className='login-button'>Log In</button>
            </form>
            <p>New? <Link to="/sign-up">Create an Account</Link></p>
        </div>
    );
}