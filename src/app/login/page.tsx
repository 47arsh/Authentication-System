"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage(){

    const router = useRouter();

    const [user, setUser] = React.useState({
        email : "",
        password : ""
    });

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const onLogin = async () => {

        if (!user.email || !user.password) {
            setError("All fields are required");
            return;
        }

        try {
            setError("");
            setLoading(true);

            const response = await axios.post("/api/users/login", user);

            console.log("Login successful", response.data);

            router.push("/profile");

        } catch (error: any) {
            setError(
                error?.response?.data?.error || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700">
                <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-8">
                    Login
                </h1>
                
                <div className="space-y-5">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                            type="text"
                            id="email"
                            value={user.email}
                            onChange={(e) => {
                                setUser({...user, email: e.target.value});
                                setError("");
                            }}
                            placeholder="enter email"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => {
                                setUser({...user, password: e.target.value});
                                setError("");
                            }}
                            placeholder="enter password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <button
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/50 mt-6"
                        disabled={loading}
                        onClick={onLogin}
                    >
                        {loading ? "Logging you in..." : "Login"}
                    </button>
                    
                    <div className="text-center mt-4">
                        <Link
                            href="/signup"
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                        >
                            Visit Signup Page
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
