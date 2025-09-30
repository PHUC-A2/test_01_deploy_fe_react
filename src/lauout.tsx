import { App } from "antd";
import AppHeader from "./components/layouts/app.header";
import AppFooter from "./components/layouts/app.footer";
import { Outlet } from "react-router";

const AppLayout = () => {
    return (
        <App>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </App>
    );
}

export default AppLayout;