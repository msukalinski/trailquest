import { Outlet } from "react-router";

import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function MainLayout() {
    return (
        <div className="app-layout min-vh-100 d-flex flex-column">
            <Header />

            <main className="app-main flex-grow-1 d-flex flex-column">
                <Outlet />
            </main>

            <Footer />
        </div >
    );
}