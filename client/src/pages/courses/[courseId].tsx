import { getCourse } from "@/apiCalls/course";
import { getLectures } from "@/apiCalls/lecture";
import { getMyPurchases } from "@/apiCalls/purchase";
import { CommonHeroSection } from "@/components/core";
import {
  DetailsPageHeroSection,
  DetailsPageLeftSide,
  DetailsPageRightSide,
  DownloadSection,
} from "@/components/DetailsPage";
import CourseContentSection from "@/components/DetailsPage/CourseContentSection.tsx";
import DetailsPageMainSection from "@/components/DetailsPage/DetailsPageMainSection";
import useSWRAPI from "@/hooks/useSWRAPI";
import { PublicLayout } from "@/layouts";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CourseDetailsPage = () => {
  const router = useRouter();
  const [isPurchased, setIsPurchased] = useState(false);

  const { data: courseData, mutate: courseMutate } = useSWRAPI(
    `api/courses/get/${router?.query?.courseId}`
  );
  console.log("courseData--->", courseData);

  const { data: lecturesData, mutate: lectureMutate } = useSWRAPI(
    `api/lectures/${router?.query?.courseId}`
  );
  console.log("lecturesData--->", lecturesData);

  const { data: purchasedCourse, mutate: purchasedMutate } =
    useSWRAPI(`api/purchases/`);

  console.log("purchasedCourse--->", purchasedCourse);

  useEffect(() => {
    if (
      purchasedCourse?.data?.purchases?.some(
        (obj: any) => obj?.course?._id === courseData?.data?.course?._id
      )
    ) {
      setIsPurchased(true);
    } else {
      setIsPurchased(false);
    }
  }, []);

  return (
    <PublicLayout title="Course Details | Learn-Mate">
      <CommonHeroSection title="Course Details" />
      <section className="w-full main-container flex flex-col lg:flex-row md:flex-col justify-between gap-10">
        {/* left side */}
        <aside className="lg:w-[70%] w-full">
          <DetailsPageHeroSection course={courseData?.data?.course} />
          <CourseContentSection
            course={courseData?.data?.course}
            lectures={lecturesData?.data?.lectures}
            isPurchased={isPurchased}
          />
        </aside>
        {/* right side */}
        <aside className="lg:w-[30%] w-full">
          <DetailsPageRightSide
            course={courseData?.data?.course}
            lectures={lecturesData?.data?.lectures}
            isPurchased={isPurchased}
            courseMutate={courseMutate}
          />
        </aside>
      </section>
    </PublicLayout>
  );
};

export default CourseDetailsPage;
