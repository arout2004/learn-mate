import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Mail,
  PhoneInTalkOutlined,
  Twitter,
} from "@mui/icons-material";

import React from "react";

const Footer = () => {
  return (
    <>
      <section className="w-full bg-emerald-50 lg:py-10 md:py-8 py-6">
        <div className="relative w-full main-container">
          {/* <img
              src="/shape-21.webp"
              alt=""
              className="absolute top-8 left-6 z-0 top-bottom-move hidden lg:block"
            /> */}

          <img
            src="/shape-22.webp"
            alt=""
            className="absolute right-20 bottom-10 z-0 right-left-move"
          />
          <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 z-10">
            {/* logo */}
            <div className="">
              <img
                src="/mate_logo.png"
                className="text-xl font-bold mb-4 h-14"
              />

              <h1 className="text-black text-2xl">Caribbean Ct</h1>
              <h2 className=" text-green-500">Haymarket, Virginia(VA).</h2>
              <div className=" lg:mt-3 leading-10">
                <p>
                  <Mail className=" text-green-500" /> address@gmail.com
                </p>
                <p>
                  {" "}
                  <PhoneInTalkOutlined className=" text-green-500" />{" "}
                  (970)262-1413
                </p>
              </div>
              <div className="social-icon flex justify-between lg:mt-8 w-40 ml-1">
                <FacebookOutlined />
                <Twitter />
                <LinkedIn />
                <Instagram />
              </div>
            </div>
            {/* category */}
            <div className="">
              <h2 className="text-2xl  font-medium mb-4">Catagory</h2>
              <ul className="text-gray-700 mt-4 font-normal text-lg leading-10  ">
                <li>
                  <a href="">Creative Writing</a>
                </li>
                <li>
                  <a href="">Film & Video</a>
                </li>
                <li>
                  <a href="">Graphic Design</a>
                </li>
                <li>
                  <a href="">UI/UX Design</a>
                </li>
                <li>
                  <a href="">Business Analytics</a>
                </li>
                <li>
                  <a href="">Marketing</a>
                </li>
              </ul>
            </div>
            {/* quick links start */}
            <div className="">
              <h2 className="text-2xl font-medium mb-4">Quick Links</h2>
              <ul className="text-gray-700 mt-4 font-normal text-lg leading-10  ">
                <li>
                  <a href="">Privacy Policy</a>
                </li>
                <li>
                  <a href="">Discussion</a>
                </li>
                <li>
                  <a href="">Terms & Conditions</a>
                </li>
                <li>
                  <a href="">Customer Support</a>
                </li>
                <li>
                  <a href="">Course FAQ's</a>
                </li>
              </ul>
            </div>
            {/* subscribe start */}
            <div className="">
              <h2 className="text-2xl font-medium mb-4">Subscribe</h2>
              <p className="text-gray-700 leading-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                temporibus{" "}
              </p>
              <div className=" mt-7">
                <input
                  type="email"
                  placeholder="Email here"
                  className=" h-12 w-60 rounded-lg pl-4 text-black border border-slate-300 mb-7"
                />
                <button className=" bg-green-600 text-white font-medium py-3 px-6 rounded-md">
                  Subscribe Now
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-5">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            <ul className="flex flex-wrap justify-center sm:justify-end">
              <li className="mr-4">
                <a href="#">Terms of Service</a> *
              </li>
              <li className="mr-4">
                <a href="#">Privacy Policy</a> *
              </li>
              <li className="mr-4">
                <a href="#">Sitemap</a> *
              </li>
              <li>
                <a href="#">Contact Us</a> *
              </li>
            </ul>
            <div className="w-full sm:w-auto">
              <p className="text-center sm:text-left">
                &copy; 2023 <span className="text-green-500">Learn Mate</span>.
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
