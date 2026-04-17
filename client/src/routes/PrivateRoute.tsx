import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {
    children: React.ReactNode;
};

function PrivateRoute({ children }: Props) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
        //with replace user wont' be able to use back button to returns to login again 
    }

    return children;
}

export default PrivateRoute;