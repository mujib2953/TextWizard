import Navigation from "../components/Navigation";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="app-container">
            <Navigation />

            <Outlet />
        </div>
    );
};

export default RootLayout;
