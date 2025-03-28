"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slice/authSlice";
import Image from "next/image";
import { auth } from "@/utils/firebase_config";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import Modal from "react-modal";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { status, error: authError } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onBlur" });

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSignInForm) {
        // 1. Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        dispatch(
          loginUser({
            email: data.email,
            password: data.password,
            firebaseUid: userCredential.user.uid,
          })
        );

        // if (json?.token) {
        toast.success("Succesfully logged in.");
        router.push("/browse");
        // } else {
        // toast.error("Failed to log in.");
        // throw new Error("Login failed");
        // }
      } else {
        // Registration
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
              name: data.name,
              firebaseUid: userCredential.user.uid,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const json = await response.json();

        if (json?.user?.firebaseUid) {
          toast.success("Registration successful! Please sign in.");
        }

        setIsSignInForm(true);
        reset();
        return;
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setErrorMsg(err.message || "Authentication failed");
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // Forgot password modal
  const handleForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen((prev) => !prev);
  };

  const handleForgotPasswordSubmit = async () => {
    setIsSendingEmail(true);
    try {
      // Call your forgot password API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotPasswordEmail }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      toast.success("Password reset email sent. Please check your inbox.");
      setIsForgotPasswordModalOpen(false);
      setForgotPasswordEmail("");
    } catch (error) {
      toast.error(error.message || "Error sending reset email");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="login">
      <div className="absolute w-full h-screen">
        <Image
          src="/bg.jpg"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative top-30 left-150 px-1 py-6 bg-black/60 text-white w-3/12 mx-auto rounded-lg"
        style={{
          paddingBlock: "1.5rem",
          paddingInline: "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h2 className="text-3xl font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>

        {!isSignInForm && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="m-2 px-4 py-2 w-72 rounded-md focus:border-b-2 border-orange-600 outline-none bg-gray-600"
            required
            {...register("name", {
              required: "Name is required",
            })}
          />
        )}
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <input
          {...register("email")}
          type="email"
          placeholder="Email Address"
          className="m-2 px-4 py-2 w-72 rounded-md focus:border-b-2 border-orange-600 outline-none bg-gray-600"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
          className="px-4 py-2 w-72 rounded-md focus:border-b-2 border-orange-600 outline-none bg-gray-600"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <p className="text-orange-600 -mt-2 text-xs text-center w-64">
          {errorMsg}
        </p>

        <button
          type="submit"
          className="w-72 px-4 py-1.5 mt-4 bg-red-600 text-white rounded-md hover:cursor-pointer hover:bg-red-500"
          disabled={!isValid}
        >
          {isSignInForm
            ? status === "loading"
              ? "Signing in..."
              : "Sign In"
            : status === "loading"
            ? "Signing up..."
            : "Sign up"}
        </button>

        {isSignInForm ? (
          <p className="text-gray-400 mt-6">
            New to ChalchitraGPT?{" "}
            <span
              className="text-white hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              Sign up now.
            </span>
          </p>
        ) : (
          <p className="text-gray-400 mt-6 mb-2">
            Already Registered?{" "}
            <span
              className="text-white hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              Sign In now.
            </span>
          </p>
        )}

        <p
          className="text-white underline cursor-pointer"
          onClick={handleForgotPasswordModal}
        >
          Forgot password
        </p>

        <p className="px-8 py-2 text-gray-400 w-96">
          Sign in is protected by Google reCAPTCHA to ensure you’re not a bot.
        </p>

        {/* ✅ Error Message */}
        {authError && (
          <p className="text-red-500 text-sm text-center mt-2">{authError}</p>
        )}

        <Modal
          isOpen={isForgotPasswordModalOpen}
          onRequestClose={() => setIsForgotPasswordModalOpen(false)}
          contentLabel="Forgot Password Modal"
          className="modal"
          // overlayClassName="overlay"
        >
          <div className="bg-white rounded-lg flex flex-col justify-center items-center w-full gap-3">
            <h2 className="text-2xl font-bold mb-4 text-red-700">
              Reset Password
            </h2>
            <p className="mb-4 text-red-700">
              Enter your email to receive a password reset link
            </p>

            <input
              type="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              placeholder="Your email address"
              className="w-96 px-4 py-2 mb-4 border rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsForgotPasswordModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPasswordSubmit}
                disabled={!forgotPasswordEmail || isSendingEmail}
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 disabled:opacity-50"
              >
                {isSendingEmail ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default Login;
