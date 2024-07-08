import React from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

const Login = ({ setUser }) => {
    const REACT_APP_FACEBOOK_APP_ID = "437934689217275";

    const handleLogin = (response) => {
        setUser(response.data);
        if (response && response.access_token) {
            window.FB.api('/me', { fields: 'name,email,picture' }, userData => {

            });
        }
        console.log(response)
    };

    return (
        <div>
            <LoginSocialFacebook
                appId={REACT_APP_FACEBOOK_APP_ID}
                onResolve={(response) => { handleLogin(response) }}
                onReject={(err) => console.log(err)}
            >
                <FacebookLoginButton />
            </LoginSocialFacebook>
        </div>
    );
};

export default Login;
