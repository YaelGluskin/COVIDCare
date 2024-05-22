import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
// After user logged in.
const DashLayout = () => {
    // The DashHeader is above every page on the protected part of the site
    return(
        <>
            <DashHeader />
            <div className="dash-container">
                <Outlet/>
            </div>
            <DashFooter />

        </>
    )
}

export default DashLayout;