import { CommonHeroSection } from "@/components/core";
import useMutation from "@/hooks/useMutation";
import { PublicLayout } from "@/layouts";
import { LocationOn, Mail, Phone } from "@mui/icons-material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";

const ContactUs = ({
  email = "learnmate@gmail.com",
  officeAddress = "Cuttack, Collage Square",
  phone = "+91 0534573049",
}: any) => {
  const { mutation } = useMutation();
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: yup.object({
      name: yup.string().required("name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      subject: yup
        .string()
        .required("subject is required")
        .min(3, "subject must be at least 3 characters")
        .max(50, "subject cannot exceed 50 characters"),
      message: yup.string().required("message is required"),
    }),
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;
        const contactData = {
          name: values?.name,
          email: values?.email,
          subject: values?.subject,
          message: values?.message,
        };

        res = await mutation(`api/contacts/`, {
          method: "POST",
          body: contactData,
          isAlert: true,
        });
        if (res?.status === 200) {
          toast.success("Message sent successfully...");
          resetForm();
        }
      } catch (error) {}
    },
  });
  return (
    <>
      <PublicLayout title="Contact | Learn-Mate">
        <CommonHeroSection title="ContactUs" />
        <section className="bg-white grid w-full">
          <div className="main-container rounded-3xl">
            <iframe
              className=" main-container  rounded-3xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.53788645907!2d85.73805123197222!3d20.300864868626256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1705766644078!5m2!1sen!2sin"
              width="450"
              height="500"
              loading="lazy"
            ></iframe>
          </div>
          <div className="main-container flex md:flex-row flex-col gap-16 rounded-md lg:p-16 p-5 border border-emerald-200 my-16">
            <aside className="w-full rounded-2xl py-8 bg-emerald-50 flex justify-center items-center">
              <div className="flex flex-col lg:gap-12 md:gap-6 gap-4">
                {/* Phone Section */}
                <div className="flex flex-col pt-6 gap-9  md:flex-row lg:flex-row  items-center">
                  <div className="bg-white group rounded-full p-4 md:p-7 h-10 w-10 lg:h-16 lg:w-16 flex items-center justify-center border outline outline-offset-8 outline-slate-200 hover:bg-green-600">
                    <Phone className="text-green-600 lg:text-4xl md:text-3xl group-hover:text-white" />
                  </div>
                  <div className=" md:text-xl">
                    <p className=" text-green-600">phone no.</p>
                    <p className="md:text-3xl lg:text-2xl">{phone}</p>
                  </div>
                </div>
                {/* Email Section */}
                <div className="flex  flex-col md:flex-row lg:flex-row pt-6 gap-9  items-center border-t border-slate-300">
                  <div className="bg-white group p-4 md:p-7 rounded-full h-10 w-10 lg:h-16 lg:w-16 flex items-center justify-center border outline outline-offset-8 outline-slate-200 hover:bg-green-600">
                    <Mail className="text-green-600 lg:text-4xl group-hover:text-white" />
                  </div>
                  <div className=" md:text-xl ">
                    <p className=" text-green-600">Email address</p>
                    <p className=" md:text-3xl lg:text-2xl">{email}</p>
                  </div>
                </div>
                {/* Office Address Section */}
                <div className="flex  flex-col pt-6 gap-9  md:flex-row lg:flex-row items-center border-t border-slate-300">
                  <div className="bg-white group p-4 md:p-7 rounded-full h-10 w-10 lg:h-16 lg:w-16 flex items-center justify-center border outline outline-offset-8 outline-slate-200 hover:bg-green-600 ">
                    <LocationOn className="text-green-600  lg:text-4xl group-hover:text-white" />
                  </div>
                  <div className=" md:text-xl">
                    <p className=" text-green-600">Office Address</p>
                    <p className=" md:text-3xl lg:text-2xl">{officeAddress}</p>
                  </div>
                </div>
              </div>
            </aside>
            <aside className="w-full flex items-center justify-center">
              {/* Contact Form Section */}
              <form onSubmit={formik.handleSubmit} className="">
                <div>
                  <h2 className="text-2xl lg:text-3xl lg:pb-20  md:text-3xl font-bold text-center text-green-400 lg:pt-3  pb-7">
                    Get in Touch With Us
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={` ${
                        formik.touched.name && formik.errors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      } flex h-16 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.name}
                    </div>
                  )}
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={` ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } flex h-16 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  )}
                  <div className="mt-2">
                    <input
                      type="=text"
                      name="subject"
                      placeholder="Enter your subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={` ${
                        formik.touched.subject && formik.errors.subject
                          ? "border-red-500"
                          : "border-gray-300"
                      } flex h-16 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  </div>
                  {formik.touched.subject && formik.errors.subject && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.subject}
                    </div>
                  )}
                  <div className="mt-2">
                    <input
                      type="text"
                      name="message"
                      placeholder="Enter your message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={` ${
                        formik.touched.message && formik.errors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      } flex h-16 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  </div>
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.message}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full mt-8 lg:mt-16  items-center justify-center rounded-md bg-green-600 hover:bg-black hover:transition-all hover:origin-center hover:duration-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Send Message
                </button>
              </form>
            </aside>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};
export default ContactUs;
