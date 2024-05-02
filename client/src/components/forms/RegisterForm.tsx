import { register, sendOtp } from "@/apiCalls/auth";
import useMutation from "@/hooks/useMutation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

const RegisterForm = ({ setToggleForm }: any) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { mutation, isLoading } = useMutation();
  // Validation schema using yup
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long"
      )
      .required("Password is required"),
    otp: yup.string().length(4).required("OTP is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { values, resetForm } = formik;
      if (isOtpSent) {
        const res: any = await mutation("api/auth/register", {
          method: "POST",
          body: {
            name: values?.name,
            email: values?.email,
            password: values?.password,
            otp: values?.otp,
          },
          isAlert: true,
        });
        if (res?.status === 200) {
          resetForm();
          setToggleForm(true);
          toast.success(
            `Registration successfull. You can now login to your account.`
          );
        }
      } else {
        const res: any = await mutation("api/otp/send", {
          method: "POST",
          body: {
            email: values?.email,
          },
          isAlert: true,
        });
        console.log("res: ", res);
        if (res?.status === 200) {
          setIsOtpSent(true);
          toast.success(
            `OTP sent to ${values.email}. Valid for 5 minutes only`
          );
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="mt-8" method="POST">
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="text-base font-medium text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              readOnly={isOtpSent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your Name"
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              readOnly={isOtpSent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Email"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Password"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        {isOtpSent && (
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="otp"
                className="text-base font-medium text-gray-900"
              >
                OTP
              </label>
            </div>
            <div className="mt-2">
              <input
                id="number"
                name="otp"
                type="otp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Password"
              />
            </div>
            {formik.touched.otp && formik.errors.otp ? (
              <div className="text-red-500">{formik.errors.otp}</div>
            ) : null}
          </div>
        )}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`${
            formik.isSubmitting ? "opacity-50" : "opacity-100"
          } inline-flex w-full items-center justify-center rounded-md bg-green-600 hover:bg-black hover:transition-all hover:origin-center hover:duration-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
        >
          Create an account
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
