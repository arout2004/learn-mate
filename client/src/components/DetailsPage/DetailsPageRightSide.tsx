import { purchaseCourse } from "@/apiCalls/purchase";
import useAuth from "@/hooks/useAuth";
import {
  CheckCircle,
  CreditCard,
  Facebook,
  Instagram,
  LibraryBooks,
  LinkedIn,
  Man2,
  Movie,
  SignalCellularAlt,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import RazorpayButton from "./CourseContentSection.tsx/RazorpayButton";

const DetailsPageRightSide = ({
  course,
  lectures,
  isPurchased,
  courseMutate,
}: any) => {
  const router = useRouter();
  const { user } = useAuth();

  const onEnroll = async () => {
    console.log("yes==============");
    try {
      const response: any = await axios.post("/api/order", {
        amount: course?.salePrice,
      });

      const res1: any = response?.data;

      console.log("res1: ", res1);

      if (res1?.success) {
        const options = {
          key_id: process.env.RAZORPAY_API_KEY!,
          amount: res1.order.amount,
          currency: "INR",
          name: "Learn Mate",
          description: `Payment for order: ${res1.order.id}`,
          image: "https://cdn.razorpay.com/logos/MGPM2DIK1Ijc0G_medium.png",
          order_id: res1.order.id,
          handler: async function (response: any) {
            const body = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data } = await axios.post("/api/verify", body);
            if (data.success) {
              const res: any = await purchaseCourse(course?._id);

              if (res?.success) {
                courseMutate();
                router.push("/my-account/my-courses");
                toast.success("Enrolled successfully in the course");
              }
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          notes: {
            address: "Learn Mate Corporate Office",
          },
          theme: {
            color: "#09182F",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <section className="">
      {/* Course Part */}
      <div className="bg-emerald-50 rounded-xl border border-emerald-300">
        <h1 className="mt-8 text-3xl text-green-700 font-semibold font-mono text-center ">
          Price{" "}
          <span className="bg-white px-4 py-2 rounded-full shadow-lg">
            ₹{course?.salePrice}
          </span>
        </h1>
        <h1 className="my-5 text-3xl text-red-800 font-semibold font-mono text-center line-through">
          MRP ₹{course?.mrp}
        </h1>
        <div className="leading-10 w-full  text-center   ">
          <div className="flex justify-around items-center p-2 border-t-2">
            <p>
              <span>
                <Man2 />
              </span>
              Instructor
            </p>
            <p>Learn Mate</p>
          </div>
          <div className="flex justify-around  gap-16  items-center p-2 border-t-2">
            <p>
              <span>
                <Movie />
              </span>{" "}
              Lectures
            </p>{" "}
            <p>{lectures?.length}</p>
          </div>
          <div className="flex justify-around gap-11 items-center p-2 border-t-2">
            {" "}
            <p>
              {" "}
              <span>
                {" "}
                <SignalCellularAlt />{" "}
              </span>{" "}
              Level
            </p>{" "}
            <p>Secondary</p>
          </div>
          <div className="flex justify-around gap-11 items-center p-2 border-t-2">
            {" "}
            <p>
              {" "}
              <span>
                <LibraryBooks />{" "}
              </span>
              Language
            </p>{" "}
            <p>English</p>
          </div>
          <div className="flex justify-around gap-12 items-center p-2 border-t-2 border-b-2">
            <p>
              {" "}
              <span>
                {" "}
                <CreditCard />
              </span>{" "}
              Life Time Access
            </p>{" "}
            <p>Yes</p>
          </div>
          {isPurchased ? (
            <button className=" bg-black h-14 w-[80%]  my-10 text-white  text-xl font-semibold rounded-xl hover:bg-black">
              <CheckCircle className="mr-2" />
              You Are Enrolled
            </button>
          ) : (
            <RazorpayButton onCheckout={onEnroll} />
          )}
        </div>
      </div>
      {/* share Part */}
      <div className="">
        <h1 className="p-5 text-3xl">Share Course:</h1>
        <div className="  flex gap-7 pt-5 pb-10 ">
          <a href="">
            <Facebook className="lg:text-5xl text-4xl text-slate-400 hover:text-white hover:bg-facebook hover:border-none border rounded-lg border-slate-500" />
          </a>
          <a href="">
            <LinkedIn className="lg:text-5xl text-4xl text-slate-400  hover:text-white hover:bg-linkedin hover:border-none border rounded-lg border-slate-500" />
          </a>
          <a href="">
            {" "}
            <Twitter className="lg:text-5xl text-4xl text-slate-400 hover:text-white hover:bg-twitter hover:border-none border rounded-lg border-slate-500" />{" "}
          </a>
          <a href="">
            <WhatsApp className="lg:text-5xl text-4xl text-slate-400 hover:text-white hover:bg-whatsapp hover:border-none border rounded-lg border-slate-500" />
          </a>
          <a href="">
            <Instagram className="lg:text-5xl text-4xl text-slate-400 hover:text-white hover:bg-instagram hover:border-none border rounded-lg border-slate-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DetailsPageRightSide;
