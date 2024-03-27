"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";
import { get } from "http";

export default function ProfilePage() {
    const [user, setUser] = React.useState("")
    const router = useRouter();
    async function handleLogout() {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error:any) {
            console.log(error.message);
        }
    }
    async function getUser() {
        const response = await axios.get("/api/users/me");
        setUser(response.data.data.username);
    }
    React.useEffect(() => {
        getUser();
    },[])
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Profile Page</h1>
            {user!="" && <h2 className="text-2xl mt-4">Welcome, {user}</h2>}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleLogout}>Logout</button>
        </div>
    )
}