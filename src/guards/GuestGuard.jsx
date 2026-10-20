import { Navigate, Outlet } from "react-router";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import Loader from "../components/loader/Loader";
import useUser from "../hooks/useUser";

export default function GuestGuard() {
    const { user, initializing } = useUser();

    const isLoggedIn = Boolean(user);

    const enteredAsGuest = useRef(false);

    useEffect(() => {
        if(initializing) {
            return;
        }

        if(!isLoggedIn) {
            enteredAsGuest.current = true;
            return;
        }

        if (!enteredAsGuest.current) {
            toast.error('You are already logged in.', {
                id: 'guest-guard-redirect',
                duration: 2500,
                style: {
                    background: '#fff4f2',
                    color: '#7f2d2d',
                    border: '1px solid #efc2bd',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    maxWidth: '420px',
                    boxShadow: '0 8px 24px rgba(127, 45, 45, 0.12)',
                },
            })
        }
    }, [initializing, isLoggedIn]);

    if (initializing) {
        return <Loader text="Loading your session" />
    }

    if (isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}