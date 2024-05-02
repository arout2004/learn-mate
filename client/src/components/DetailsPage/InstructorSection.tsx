import { Star } from "@mui/icons-material";
import React from "react";

const InstructorSection = ({ instructors }: any) => {
  return (
    <>
      <h1 className="text-3xl my-12">Course Instructor:</h1>

      <section className="lg:w-full grid grid-cols-2  md:grid-cols-4 lg:grid-cols-4  gap-16 ">
        {instructors.map((instructor: any, index: any) => (
          <div key={index} className="">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="h-24 w-24 object-cover rounded-full  outline-2 outline-slate-300 outline  outline-offset-[10px] hover:outline-green-600"
            />

            <p className="mt-5 text-lg">
              {` ${instructor.rating} `}{" "}
              <span>
                {" "}
                <Star className="text-sm text-yellow-500" />{" "}
              </span>{" "}
              <span className="text-sm">(rating)</span>{" "}
            </p>
            <h1 className=" text-lg font-semibold">{instructor.name}</h1>
            <p className=" text-green-600">{instructor.title}</p>
          </div>
        ))}
      </section>
      <div className=" lg:flex  gap-14 mt-16">
        <div className=" w-full md:w-full lg:w-full">
          <div className=" ">
            <h3 className=" text-2xl mb-4">Rating:</h3>
            <div className="text-md text-gray-600 space-y-3">
              <p>
                Lorem Ipsum is simply dummy text of printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500 unknown printer took a galley of type.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of printing and typesetting
                industry text ever since
              </p>
              <p>
                Lorem Ipsum is simply dummy text of printing and industry's
                standard dummy text ever since the 1500 unknown printer took a
                galley of type.
              </p>
            </div>
          </div>
        </div>

        <div className="border-2  border-gray-200 p-4 mt-3 w-full lg:w-full  h-80  rounded-xl ">
          <div className="  text-center">
            <span className="text-xl font-bold">
              4.8 <Star className="text-yellow-500 text-sm" />
            </span>
            <p className="ml-2">Rating (86K+)</p>
          </div>
          <div className=" mt-4 space-y-4">
            <div className="flex items-center">
              {/* Left side - 5 stars */}
              <span className="text-lg flex items-center">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
              </span>

              {/* Right side - Progress bar */}
              <div className="ml-4 w-full">
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {/* Left side - 5 stars */}
              <span className="text-lg flex items-center">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className=" text-slate-300" />
              </span>

              {/* Right side - Progress bar */}
              <div className="ml-4 w-full">
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "74%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {/* Left side - 5 stars */}
              <span className="text-lg flex items-center">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className=" text-slate-300" />
                <Star className=" text-slate-300" />
              </span>

              {/* Right side - Progress bar */}
              <div className="ml-4 w-full">
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "55%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {/* Left side - 5 stars */}
              <span className="text-lg flex items-center">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className=" text-slate-300" />
                <Star className=" text-slate-300" />
                <Star className=" text-slate-300" />
              </span>

              {/* Right side - Progress bar */}
              <div className="ml-4 w-full">
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              {/* Left side - 5 stars */}
              <span className="  flex items-center">
                <Star className="text-yellow-500" />
                <Star className=" text-slate-300" />
                <Star className=" text-slate-300" />
                <Star className=" text-slate-300" />
                <Star className=" text-slate-300" />
              </span>

              {/* Right side - Progress bar */}
              <div className="ml-4 w-full">
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorSection;
