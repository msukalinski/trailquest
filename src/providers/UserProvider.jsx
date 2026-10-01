import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { supabase } from "../lib/supabase";

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);

            if (event === 'INITIAL_SESSION') {
                setInitializing(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, initializing }}>
            {children}
        </UserContext.Provider>
    );
}