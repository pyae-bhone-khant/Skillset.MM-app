"use client"
import { useAuth } from "@/lib/authprovider";
import Image from "next/image";
import OverviewPage from "./overview";

export default function Overview() {
    const { user } = useAuth()
    return (
        <div className="mt-10 px-10">
            <div className="w-full h-33 bg-gradient-to-br from-indigo-300 via-indigo-500 to-white flex  justify-between items-center text-center px-10   rounded-2xl ">
                <div className="flex gap-8">
                    {
                        user?.profile?.avatarUrl ? (
                            <Image
                                src={user.profile.avatarUrl}
                                alt={user.profile.fullName || "Profile"}
                                width={40}
                                height={40}
                                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 bg-indigo-500 flex-shrink-0"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-2xl mt-1  bg-gray-200 flex items-center justify-center">
                                {user?.profile?.fullName?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )
                    }
                      <div className="flex flex-col items-start ">
                <p className="text-white/70 text-sm mb-1">Welcome back,</p>
                <h1 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {user?.profile?.fullName} 👋
                </h1>
                <p className="text-indigo-200 text-sm mt-1">You have 3 courses in progress. Keep the momentum going!</p>
              </div>
                </div>
                 <div className="flex gap-8 flex-shrink-0">
                {[{ label: "Enrolled", value: "0" }, { label: "Completed", value: "0" }, { label: "Certificates", value: "0" }].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
                    <p className="text-blue-950 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div> 
            <OverviewPage />
        </div>
    )
}
