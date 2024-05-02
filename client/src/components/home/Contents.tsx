import useSWRAPI from "@/hooks/useSWRAPI";
import Link from "next/link";
import { CourseCard } from "../cards";

const Contents = () => {
  const CONTENT_ARRAY = [
    {
      image: "courses-01.webp",
      desc: "Data Science and Machine Learning with Python - Hands On!",
      icon: "courses-01.webp",
      name: "Himanshu",
      date: "12-09-23",
      button: "Science",
      duration: "8hr 15min",
      lecture: "29 lecture",
      price: "$136.00",
      rating: "4.9",
    },
    {
      image: "courses-02.webp",
      desc: "Create Amazing Color Schemes for Your UX Design Projects",
      icon: "courses-02.webp",
      name: "Himanshu",
      date: "12-09-23",
      button: "Science",
      duration: "8hr 15min",
      lecture: "29 lecture",
      price: "$136.00",
      rating: "4.9",
    },
    {
      image: "courses-03.webp",
      desc: "Culture & Leadership: Strategies for a Successful Business",
      icon: "courses-03.webp",
      name: "Himanshu",
      date: "12-09-23",
      button: "Science",
      duration: "8hr 15min",
      lecture: "29 lecture",
      price: "$136.00",
      rating: "4.9",
    },
    {
      image: "courses-04.webp",
      desc: "Finance Series: Learn to Budget and Calculate your Net Worth.",
      icon: "courses-04.webp",
      name: "Himanshu",
      date: "12-09-23",
      button: "Design",
      duration: "8hr 15min",
      lecture: "29 lecture",
      price: "Free",
      rating: "4.9",
    },
    {
      image: "courses-05.webp",
      desc: "Build Brand Into Marketing: Tackling the New Marketing Landscape",
      icon: "courses-05.webp",
      name: "Himanshu",
      date: "12-09-23",
      button: "Design",
      duration: "8hr 15min",
      lecture: "29 lecture",
      price: "$136.00",
      rating: "4.9",
    },
    {
      image: "courses-06.webp",
      desc: "Graphic Design: Illustrating Badges and Icons with Geometric Shapes",
      icon: "courses-06.webp",
      name: "Himanshu",
      button: "Design",
      duration: "8hr 15min",
      lecture: "29 lecture",
      price: "$136.00",
      rating: "4.9",
    },
  ];
  const { data, mutate } = useSWRAPI("api/courses/");
  return (
    <>
      <div className="h-2/4 bg-white w-full flex justify-center main-container place-content-center">
        <div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full my-14">
          {data?.data?.courses?.slice(0, 6).map((item: any, index: number) => (
            <CourseCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center group">
        <Link
          href={"/courses"}
          className="px-8 py-4 text-green-600 rounded-2xl border group-hover:border-green-600 font-semibold text-xl text-center  mb-4 bg-[#E7F8EE]"
        >
          Other Courses
        </Link>
      </div>
    </>
  );
};

export default Contents;
