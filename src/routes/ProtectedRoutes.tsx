import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	// TODO: Use authentication token
	const localStorageToken = localStorage.getItem("token_access");

	return localStorageToken ? <Outlet /> : <Navigate to="/sign-in" replace/>;
};

export default ProtectedRoutes;