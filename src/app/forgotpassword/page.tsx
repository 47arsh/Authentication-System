"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try {
            await axios.post("/api/users/forgotpassword", { email });
            toast.success("Reset email sent!");
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <input
                className="p-3 text-black"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <button onClick={handleSubmit}>Send Reset Email</button>
        </div>
    );
}