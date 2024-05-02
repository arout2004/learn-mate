import { CourseCard } from "@/components/cards";
import { CommonHeroSection } from "@/components/core";
import useSWRAPI from "@/hooks/useSWRAPI";
import { PublicLayout } from "@/layouts";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const MyCourses = () => {
  const { data, mutate } = useSWRAPI("api/purchases/");
  return (
    <PublicLayout title="My Courses | Learn-Mate">
      <CommonHeroSection title="My-courses" />
      <>
        <section className="py-10">
          <h1 className="text-4xl font-bold text-center mb-5 lg:mb-8 relative">
            My- <span className="text-green-400">Courses</span>
            <span className="flex items-center justify-center absolute left-48 md:left-[53%] lg:left-[53%] transform -translate-x-1/2">
              <img src="/shape-4.webp" className="text-center w-40" alt="" />
            </span>
          </h1>
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8 main-container   h-full">
            {data?.data?.purchases?.map((item: any, index: number) => (
              <CourseCard key={index} item={item?.course} />
            ))}
          </div>
        </section>
      </>
    </PublicLayout>
  );
};

export default MyCourses;
