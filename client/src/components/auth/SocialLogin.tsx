import React from 'react'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
// import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../../redux/actions/authActions'
const SocialLogin = () => {
    const dispatch = useDispatch()

    const onSuccessGg = (googleUser: GoogleLoginResponse) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token)
        dispatch(loginGoogle(id_token))
    }

    // const onSuccessFb = (response: FacebookLoginAuthResponse) => {
    //     console.log(response);
    // }
    // const onFailure = (error: any) => {
    //     console.log(error);
    // }

    return (
        <>
            <div>
                <GoogleLogin
                    client_id='1039922234060-e3lkc0uhol3k7fbpfkt5kls2m8sog50k.apps.googleusercontent.com'
                    cookiepolicy='single_host_origin'
                    onSuccess={onSuccessGg}
                />
                {/* <FacebookLogin
                    appId="764239864202944"
                    onSuccess={onSuccessFb}
                    onFailure={onFailure}
                    isSignedIn={true}
                /> */}
            </div>
        </>
    )
}

export default SocialLogin
