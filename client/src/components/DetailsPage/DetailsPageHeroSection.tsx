import { Star } from "@mui/icons-material";
import React from "react";

const DetailsPageHeroSection = ({ course }: any) => {
  return (
    <div className="w-full overflow-y-auto mb-10">
      <img
        className=" rounded-lg w-[100%] h-[35rem] object-cover"
        src={course?.thumbnail}
        alt=""
      />
      <button className="text-white bg-yellow-600 px-3 py-3 inline-block rounded-lg text-xl relative bottom-16 left-5 ">
        {course?.category?.name}
      </button>
      <p className=" text-xl md:text-2xl lg:text-3xl font-medium">
        {course?.name}
      </p>
      <p className=" text-sm md:text-md lg:text-lg text-gray-600">
        {course?.description}
      </p>
    </div>
  );
};

export default DetailsPageHeroSection;
