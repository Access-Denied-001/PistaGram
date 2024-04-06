import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { useRoomContext } from "../Context/SelectedRoomContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const { setSelectedRoom } = useRoomContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("auth-user");
            setAuthUser(null);
            setSelectedRoom(null);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
