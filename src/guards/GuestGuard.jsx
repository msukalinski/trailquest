import { Navigate, Outlet } from "react-router";

import Loader from "../components/loader/Loader";
import useUser from "../hooks/useUser";

export default function GuestGuard() {
    const { user, initializing } = useUser();

    if (initializing) {
        return <Loader text="Loading your session" />
    }

    if (user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}