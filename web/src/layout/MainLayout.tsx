import {NavBar} from "./NavBar.tsx";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Footer} from "./Footer.tsx";

export const MainLayout = () => {
    return <div className="layout-wrapper">
        <ToastContainer/>
        <NavBar></NavBar>
        <main className="main-content">
            <Outlet/>
        </main>
        <Footer></Footer>
    </div>
}
