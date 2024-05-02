import React, { useState } from "react";
import { CommonHeroSection } from "@/components/core";
import { LoginForm, RegisterForm } from "@/components/forms";
import { PublicLayout } from "@/layouts";

const LoginWrapper = () => {
  const [toggleForm, setToggleForm] = useState(true);
  return (
    <>
      <PublicLayout title="Login | Learn-Mate">
        <CommonHeroSection title={toggleForm ? "Login" : "Registration"} />
        <section className="bg-white grid h-[100%] py-10 w-full ">
          <div className="grid rounded-md py-8 2xl:grid-cols-2 grid-rows-[1fr, 1fr] lg:grid-cols-2 w-[80%] place-self-center border  border-green-600 ">
            <div className="h-50 grid w-full  ">
              <div className="h-[50vh] w-[80%] lg:h-[70vh] relative grid place-self-center rounded-2xl shadow-slate-800  bg-emerald-100/50">
                <div className="absolute left-8 md:left-44 lg:left-28 top-7  bg-green-500/60 rounded-full h-40 w-40 lg:h-44 lg:w-44 ">
                  <img
                    src="/shape-26.webp"
                    alt=""
                    className=" absolute left-10 top-10 font-bold h-24"
                  />
                </div>
                <img
                  className=" w-[80%] rounded-md h-[40vh]  lg:h-[65vh] place-self-center z-10"
                  src="/register-login.webp"
                  alt=""
                />
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-center text-green-400 sm:text-4xl">
                  {toggleForm ? "Sign in" : "Register Now"}
                </h2>
                {!toggleForm ? (
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    <span>Already have an account? </span>
                    <span
                      onClick={() => setToggleForm(true)}
                      className="cursor-pointer font-semibold text-black transition-all duration-200 hover:underline"
                    >
                      Sign In
                    </span>
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    <span>Don&apos;t have an account? </span>
                    <span
                      onClick={() => setToggleForm(false)}
                      className="cursor-pointer font-semibold text-black transition-all duration-200 hover:underline"
                    >
                      Create a free account
                    </span>
                  </div>
                )}
                {toggleForm ? (
                  <LoginForm />
                ) : (
                  <RegisterForm setToggleForm={setToggleForm} />
                )}
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default LoginWrapper;
