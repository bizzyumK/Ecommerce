import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {
    children: React.ReactNode;
};

function AdminRoute({ children }: Props) {
    const { user } = useContext(AuthContext);

    if (!user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;