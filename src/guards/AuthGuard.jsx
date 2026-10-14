import { Navigate, Outlet } from "react-router";

import Loader from "../components/loader/Loader";
import useUser from "../hooks/useUser";

export default function AuthGuard() {
    const { user, initializing } = useUser();

    if (initializing) {
        return <Loader text="Loading your session..." />
    }

    if (!user) {
        return <Navigate
            to="/login"
            replace
            state={{ message: 'Please log in or register to access this page.' }}
        />
    }

    return <Outlet />
}