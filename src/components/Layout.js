import { Outlet } from "react-router-dom";
// The purpose of the layout is if we have a banner, we can do it here
const Layout = () => {
    return <Outlet /> // Rendar the children of the Outlet component
}
export default Layout;