import { getLocalStorageItem } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
     let token = getLocalStorageItem("financejwt");
    useEffect(
        function () {
            if (!token || token==null) navigate("/login");
        },
        [token, navigate]
    );
    if (token) return children;
}

export default ProtectedRoute;