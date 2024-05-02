import { CourseCard } from "@/components/cards";
import { CommonHeroSection } from "@/components/core";
import useSWRAPI from "@/hooks/useSWRAPI";
import PublicLayout from "@/layouts/public";
import { useState } from "react";

const AllCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, mutate } = useSWRAPI("api/categories/");
  const { data: allCourses, mutate: courseMutate } = useSWRAPI("api/courses/");
  const filteredCourses: any[] = selectedCategory
    ? allCourses?.data?.courses?.filter(
        (course: any) => course?.category === selectedCategory
      ) || []
    : allCourses?.data?.courses || [];

  console.log("filteredCourses-->", filteredCourses);

  //   const uniqueCategories = Array.from(
  //     new Set(COURSE_DATA.map((course) => course.category))
  //   );

  return (
    <PublicLayout title="Courses | Learn-Mate">
      <>
        <CommonHeroSection title="All Courses" />
        <div className="main-container my-12">
          <h1 className="text-4xl font-bold my-8">Explore Our Courses</h1>
          <div className="mb-12">
            <p className="font-semibold text-gray-600 mb-4">
              Filter by Category:
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === ""
                    ? "bg-primary/90 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                All
              </button>
              {data?.data?.categories?.map((category: any) => (
                <button
                  key={category?._id}
                  onClick={() => setSelectedCategory(category?._id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === category?._id
                      ? "bg-primary/70 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {category?.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses &&
              filteredCourses?.map((singleCourse: any) => (
                <CourseCard key={singleCourse?._id} item={singleCourse} />
              ))}
          </div>
        </div>
      </>
    </PublicLayout>
  );
};

export default AllCourses;
