"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage(){

    const [user, setUser] = React.useState({
        username : "",
        email : "",
        password : ""
    })

    const onSignup = async () => {

    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
                
                <div className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                            type="text" 
                            id="username" 
                            value={user.username}
                            onChange={ (e) => {
                                setUser({...user ,username : e.target.value })
                            }}
                            placeholder="enter username"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                            type="text" 
                            id="email" 
                            value={user.email}
                            onChange={ (e) => {
                                setUser({...user ,email : e.target.value })
                            }}
                            placeholder="enter email"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                            type="password" 
                            id="password" 
                            value={user.password}
                            onChange={ (e) => {
                                setUser({...user ,password : e.target.value })
                            }}
                            placeholder="enter password"
                        />
                    </div>
                    
                    <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors mt-6" onClick={onSignup}>
                        Sign Up
                    </button>
                    
                    <div className="text-center mt-4">
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            Visit Login Page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}