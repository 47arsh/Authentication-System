"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProfilePage(){

    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("/api/users/me");
                setUser(response.data.data);
            } catch (error) {
                toast.error("Failed to fetch user");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Loading...
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <div className="w-full max-w-2xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
                    Profile
                </h1>

                <p className="text-gray-300 text-center text-lg">
                    Welcome, {user?.username}
                </p>

                <p className="text-gray-400 text-center">
                    Email: {user?.email}
                </p>
            </div>

            <button
                className="w-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/50 mt-6"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
