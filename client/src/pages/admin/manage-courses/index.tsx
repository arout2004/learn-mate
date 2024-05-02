import { AddCourseDialog, UpdateCourseDialog } from "@/components/forms";
import { useCourses } from "@/hooks/useCourse";
import useMutation from "@/hooks/useMutation";
import useSWRAPI from "@/hooks/useSWRAPI";
import { AdminLayout } from "@/layouts";
import {
  DeleteOutline,
  MenuBook,
  Preview,
  Schedule,
  Search,
} from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageCourses = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, mutate } = useSWRAPI("api/courses/");
  console.log("data---->", data);

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const filteredCourses: any[] =
    data?.data?.courses?.filter((course: any) =>
      course?.name?.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];

  return (
    <AdminLayout title="Manage Course | Learn-Mate">
      <h1 className="text-3xl font-semibold text-center text-primary">
        All Courses
      </h1>
      <div className="flex lg:mb-6 my-4 gap-6 items-center lg:justify-end lg:mr-9">
        <div className="flex gap-2 bg-white items-center px-2 rounded-lg">
          <Search className="text-3xl text-gray-700" />
          <input
            type="search"
            value={searchValue}
            onChange={handleSearch}
            className="outline-none p-2 text-lg font-medium focus:border-primary"
            placeholder="search Courses"
          />
        </div>
      </div>
      <section className="w-full flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:min-h-[12rem] min-h-[5rem]">
            <AddCourseDialog mutate={mutate} />
          </div>
          {filteredCourses?.map((data: any) => (
            <CourseCard key={data?._id} item={data} mutate={mutate} />
          ))}
        </div>
      </section>
    </AdminLayout>
  );
};

export const CourseCard = ({ item, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutation } = useMutation();

  const handleDeleteCourse = async (ID: any) => {
    setIsLoading(true);
    try {
      Swal.fire({
        title: "Warning",
        text: "Are you sure you want to delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes",
        cancelButtonText: "No cancel",
      }).then(async (result) => {
        if (result?.isConfirmed) {
          const res = await mutation(`api/courses/${ID}`, {
            method: "DELETE",
            isAlert: true,
          });
          mutate?.();
          toast.success("Course deleted successfully...");
        }
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full border border-primary/40  bg-[#e5f4ed] rounded-3xl">
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4.709zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm-2-7a6 6 0 016-6V0C11.373 0 6 5.373 6 12h4z"
              ></path>
            </svg>
            <p className="text-lg font-semibold text-red-400">Deleting</p>
          </div>
        </div>
      ) : (
        <article className="relative group flex flex-col  bg-[#e5f4ed] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl  overflow-hidden">
          <div className="flex justify-center py-2  bg-primary"></div>
          <div className="h-full w-full space-y-3 bg-transparent p-5 rounded-lg border hover:border-green-300 cursor-pointer">
            <img
              src={item?.thumbnail && item?.thumbnail}
              className="w-full h-[18rem] rounded-xl shadow-lg"
            />
            <div className="flex items-center w-full h-[4rem] mt-4 ml-4">
              <img
                src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div className="flex justify-around items-center w-full">
                <p className="text-md ml-2">ADMIN</p>
                <button className="bg-[#E7F8EE] text-green-500 w-full h-10  ml-3 rounded-lg">
                  {item?.category?.name}
                </button>
              </div>
            </div>
            <p className="hover:text-green-500 w-full ml-5 text-gray-900 font-medium text-lg">
              {item?.name}
            </p>
            <p className="hover:text-green-500 w-full ml-5 text-gray-600 text-sm">
              {item?.description}
            </p>
            <div className=" flex justify-between mx-5 my-5 text-sm">
              <div>
                <Schedule className=" text-green-700 mr-1" />
                unlimited Access
              </div>
              <div>
                <MenuBook className=" text-green-700" /> Lecture 27
              </div>
            </div>
            <div className=" bg-[#EEFBF3] px-3 py-6  h-14 rounded-xl flex items-center justify-between">
              <p className="text-blue-700 font-bold text-xl">
                salePrice: {item?.salePrice}
              </p>
              <p className="text-red-700 font-bold text-xl line-through">
                MRP: {item?.mrp}
              </p>
              <Button className="bg-green-200"> view course </Button>
            </div>
          </div>

          <div className="invisible absolute bg-black p-2 rounded-md top-1/2 right-1/2  opacity-0 flex flex-row gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible">
            <Link href={`/admin/manage-courses/course/${item?._id}`}>
              <Tooltip
                title="view lectures"
                followCursor
                placement="top-start"
                arrow
              >
                <button className="w-8 h-8 grid place-items-center rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-500">
                  <Preview fontSize="small" />
                </button>
              </Tooltip>
            </Link>

            <UpdateCourseDialog course={item} mutate={mutate} />
            <Tooltip
              title="delete course"
              followCursor
              placement="top-start"
              arrow
            >
              <button
                className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
                onClick={() => handleDeleteCourse(item?._id)}
              >
                <DeleteOutline fontSize="small" />
              </button>
            </Tooltip>
          </div>
        </article>
      )}
    </>
  );
};

export default ManageCourses;

// const courses = [
//   {
//     id: "56759956",
//     courseName: "course 1",
//     description: "",
//     category: "", // these will be select from category array which are created before categories array in local storage
//     image: "",
//     price: "",
//     duration: "",
//     lectureCount: "3", // there are 3 lecture so that
//     lectures: [
//       {
//         lectureId: "",
//         title: "lesson 1",
//         contents: ["text 1", "text 2", "text 3"],
//         videos: ["video 1 Upload ", "video 2 upload", " video 3 upload"],
//       },
//       {
//         lectureId: "",
//         title: "lesson 2",
//         contents: ["text 1", "text 2", "text 3"],
//         videos: ["video 1 Upload ", "video 2 upload", " video 3 upload"],
//       },
//       {
//         lectureId: "",
//         title: "lesson 3",
//         contents: ["text 1", "text 2", "text 3"],
//         videos: ["video 1 Upload ", "video 2 upload", " video 3 upload"],
//       },
//     ],
//     // these below will vary per student by default it will false ,
//     isInCart: "", // false
//     isPurchased: "", // false
//     studentDetails: {
//       // no one
//       studentId: "",
//       name: "",
//       email: "",
//     },
//   },
//   {
//     id: "45469956",
//     courseName: "course 2",
//     description: "",
//     category: "", // these will be select from category array which are created before categories array in local storage
//     image: "",
//     price: "",
//     duration: "",
//     lectureCount: "3", // there are 3 lecture so that
//     lectures: [
//       {
//         title: "lesson 1",
//         contents: ["text 1", "text 2", "text 3"],
//         videos: ["video 1 Upload ", "video 2 upload", " video 3 upload"],
//       },
//       {
//         title: "lesson 2",
//         contents: ["text 1", "text 2", "text 3"],
//         videos: ["video 1 Upload ", "video 2 upload", " video 3 upload"],
//       },
//       {
//         title: "lesson 3",
//         contents: ["text 1", "text 2", "text 3"],
//         videos: ["video 1 Upload ", "video 2 upload", " video 3 upload"],
//       },
//     ],
//     // these below will vary per student by default it will false ,
//     isInCart: "", // false
//     isPurchased: "", // false
//     studentDetails: {
//       // no one
//       studentId: "",
//       name: "",
//       email: "",
//     },
//   },
// ];
