import { InnerNav } from "@/layouts/public/InnerNav";
import { UpperNav } from "@/layouts/public/UpperNav";
import { WorkspacePremium } from "@mui/icons-material";
import React from "react";

type Props = {
  title: string;
};

const CommonHeroSection = ({ title }: Props) => {
  return (
    <>
      <section className="relative bg-emerald-50">
        <UpperNav />
        <InnerNav />
        <img
          className="shape-8 absolute lg:left-20 lg:h-20 lg:w-20 h-16 w-16 top-28 left-10 lg:top-[40%]"
          src="/shape-8.webp"
          alt=""
        />
        <div className="lg:h-[40vh] md:h-[26vh] h-[40vh] w-full flex flex-col lg:flex-row items-center justify-between my-9">
          <aside className="lg:w-1/2 text-sm md:text-lg lg:text-xl">
            <div className="h-24 main-container mx-4 lg:mx-10">
              <div className="absolute bottom-24 lg:left-52 md:left-24 md:bottom-24 left-4 leading-[3rem]">
                <span className="">
                  <span className="mr-1">Home</span>//
                  <span className="text-green-500 ml-1">{title}</span>
                </span>
                <p className="text-xl md:text-3xl lg:text-4xl">
                  {title}
                  <span>
                    <img
                      className="w-32 absolute lg:left-28 lg:-bottom-5 hidden lg:block"
                      src="/shape-4.webp"
                      alt=""
                    />
                  </span>
                </p>
              </div>
              <div className="absolute bottom-0 -left-0">
                <img
                  className="lg:h-[20vh] md:h-[10vh]  h-16"
                  src="/shape-23.webp"
                  alt=""
                />
              </div>
            </div>
          </aside>

          <aside className="w-full lg:w-1/2 flex flex-col lg:flex-row relative items-center justify-center mt-6 lg:mt-0">
            <div className="bg-green-600  bottom-56 right-24 md:h-24 text-center md:w-24 lg:h-28 lg:w-28 h-16 w-16 absolute lg:-top-28  lg:left-40 md:right-64 md:bottom-32 rounded-full outline-1 outline outline-offset-8 outline-emerald-300">
              <WorkspacePremium className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24    text-white" />
            </div>
            <img
              className=" bottom-48 right-20 w-24  lg:w-40 md:w-28 absolute lg:left-32 lg:top-0 md:right-60 md:bottom-24"
              src="/shape-6.webp"
              alt=""
            />

            <img
              className="shape-5 hidden md:block lg:block absolute lg:-top-32 lg:right-72 md:bottom-52 md:right-40"
              src="/shape-5.webp"
              alt=""
            />
            <div className="absolute lg:right-20 lg:-bottom-[7rem] md:right-20 md:-bottom-[2.5rem] ">
              <img
                className="rounded-full relative  left-40 top-10 lg:left-52  lg:top-[25rem] md:top-[15rem]  md:left-48 lg:h-40 lg:w-40 md:h-28 md:w-28 h-20 w-20"
                src="/author-11.webp"
                alt=""
              />

              <img
                className="z-0  h-60 md:h-[30vh] lg:h-[56vh]  bottom-40 -right-16 md:bottom-10  relative lg:top-9"
                src="/shape-24.webp"
                alt=""
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CommonHeroSection;
