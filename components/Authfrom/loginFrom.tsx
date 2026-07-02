"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/form-schema";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authprovider";
import { toast } from "sonner";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  
const { setUser } = useAuth();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setLoginError(null);
    try {
      const response = await api.post("/auth/login", values);     
      toast.success("Login successful!");
      const {token, user} = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(user);
      
      // Role ပေါ်မူတည်၍ Redirect လုပ်ခြင်း
      if (user.role === "STUDENT") {
        router.push("/home/dashboard/student/overview");
      } else if (user.role === "ADMIN") {
        router.push("/home/dashboard/admin/overview");
      } else if (user.role === "TEACHER") {
        router.push("/home/dashboard/teacher/overview");
      } else {
        setLoginError("Unknown role assigned.");
      }

    } catch (error : any) {
      if (error.response) {
      // Server က အဖြေပြန်ပေးတယ် (ဥပမာ- 400, 401, 500)
      console.error("Response Error:", error.response.data);
      toast.error("Login failed." , error.response.data);
    } else if (error.request) {
      // Request ပို့တယ်၊ ဒါပေမဲ့ ဘာမှ ပြန်မလာဘူး (ဒီနေရာက Network Error အစစ်ပါ)
      console.error("Request Error (Network):", error.request);

      toast.error(`Login failed` , error.request);
    } else {
      console.error("Setup Error:", error.message);
      toast.error(`Login failed. ${error.message}`);
    }
    setLoginError("Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#010114] px-4 py-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e] border border-white/10 shadow-2xl">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-gray-400">Sign in to your account to continue</p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{loginError}</p>
            </div>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-300">
                      Email Address
                    </FormLabel>    
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white/10 transition-all duration-200 h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-gray-300">
                        Password
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white/10 transition-all duration-200 h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Remember Me Checkbox */}
              <div className="flex  justify-between items-center space-x-2">
                <div className="flex items-center space-x-2">

                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-2 cursor-pointer transition-colors"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors"
                >
                  Remember me
                </label>
                </div>
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-500 hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              </div>

              {/* Forgot Password Link */}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed "
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center pt-2 border-t border-white/5">
            <p className="text-sm text-gray-400">
              Don{"'"}t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
