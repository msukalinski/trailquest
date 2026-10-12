import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { supabase } from "../lib/supabase";
import { login, logout, registerUser } from "../services/userService";

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        let active = true;

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {

            if (!active) {
                return;
            };

            setUser(session?.user ?? null);

            if (event === 'INITIAL_SESSION') {
                setInitializing(false);
            }
        });

        return () => {
            active = false;
            subscription.unsubscribe()
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, initializing, login, registerUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}