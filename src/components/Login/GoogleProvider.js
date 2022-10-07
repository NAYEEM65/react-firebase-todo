import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';

const GoogleProvider = () => {
    const handlePopupSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    return (
        <div className="w-full mt-2">
            <button
                onClick={handlePopupSignIn}
                className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 transition-all duration-100 ease-in-out border-blue-500 border-2 hover:border-blue-600 rounded w-full"
            >
                <FcGoogle className="h-5 w-5 rounded-full bg-white" />
                Signin With Google
            </button>
        </div>
    );
};

export default GoogleProvider;
