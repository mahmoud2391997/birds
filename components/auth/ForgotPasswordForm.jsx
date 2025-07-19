"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Schema validation
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/@gmail\.com$/, "Email must be a Gmail address"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data)
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-light text-center text-gray-800 mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email")}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`${loading ? 'cursor-wait' : 'cursor-pointer'} w-full bg-black text-white font-semibold py-2 mt-5 rounded-lg transition duration-300`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send Reset Link"}
          </button>

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        </form>
        <div className="text-center mt-4">
          <Link href="/auth/signin" className="text-sm text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
