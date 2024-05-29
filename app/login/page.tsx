"use client";
import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [value, setValue] = useState<string | null>(null);
    const router = useRouter()

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                const user = data.user;
                if (user) {
                    setValue(user.email);
                    localStorage.setItem('email', user.email as string);
                }
            })
            .catch((error) => {
                console.error('Error signing in with Google:', error);
            });
    };

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 justify-center min-h-screen bg-slate-900">
            <div className="p-8 rounded-lg w-[20vw] h-[10vh] text-center">
                <h1>Welcome to budget-tracker</h1>
            </div>
            <div className="bg-slate-800 p-8 rounded-lg w-[20vw] h-[30vh] flex items-center justify-center flex-col gap-4">
        <h1 className="text-3xl font-bold mb-8">Login with Google</h1>
        <button 
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Sign In with Google
        </button>
            </div>
    </div>
    );
}
