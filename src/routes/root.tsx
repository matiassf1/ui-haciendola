import {
    createBrowserRouter,
} from "react-router-dom";
import { ErorrPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import { RegisterPage } from "../pages/RegisterPage";
import { ProductPage } from "../pages/ProductPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
        errorElement: <ErorrPage />
    },
    {
        path: "/sign-in",
        element: <LoginPage />,
    },
    {
        path: "/sign-up",
        element: <RegisterPage />,
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/product",
                element: <ProductPage />,
            },
        ],
    },
]);