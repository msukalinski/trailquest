import { useContext } from "react";

import { UserContext } from "../context/UserContext";

export default function useUser() {
    const context = useContext(UserContext);

    if(context === null) {
        throw new Error('useUser must be used inside UserProvider.');
    }

    return context;
}