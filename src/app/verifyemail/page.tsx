"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {

        const verifyUserEmail = async () => {
            try {

                // Extract token from URL
                const token = searchParams.get("token");

                if (!token) {
                    toast.error("Invalid verification link");
                    setLoading(false);
                    return;
                }

                // Send token to backend
                await axios.post("/api/users/verifyemail", { token });

                //  Success
                setVerified(true);
                toast.success("Email verified successfully!");

            } catch (error: any) {

                toast.error(
                    error?.response?.data?.error || "Verification failed"
                );

            } finally {
                setLoading(false);
            }
        };

        verifyUserEmail();

    }, []);

    // UI STATES

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Verifying your email...
            </div>
        );
    }

    if (verified) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
                <h1 className="text-3xl mb-4">Email Verified 🎉</h1>
                <button
                    onClick={() => router.push("/login")}
                    className="px-6 py-3 bg-blue-600 rounded-lg"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            Verification failed.
        </div>
    );
}
