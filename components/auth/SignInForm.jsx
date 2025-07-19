"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

// Schema validation
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(
      /@(gmail\.com|hireslab\.com)$/,
      "Email must be a Gmail or TheHiresLab address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(signIn(data));
    reset();
  };

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-light text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-5">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`${
              loading ? "cursor-wait" : "cursor-pointer"
            }  w-full bg-black text-white font-semibold py-2 rounded-lg transition duration-300`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
