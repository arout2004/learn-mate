import React, { useState } from "react";
import DescriptionSection from "./DescriptionSection";
import InstructorSection from "./InstructorSection";
import ReviewSection from "./ReviewSection";
import DownloadSection from "./DownloadSection";

export const COMPONENT_ARR = [
  {
    title: "Description",
    Component: (
      <DescriptionSection
        sections={[
          {
            title: "Description:",
            content: [
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.",
            ],
          },
          {
            title: "Curriculum:",
            content: [
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.",
            ],
          },
          {
            title: "Certification:",
            content: [
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.",
            ],
          },
        ]}
      />
    ),
  },
  {
    title: "Instructor",
    Component: (
      <InstructorSection
        instructors={[
          {
            image: "/author-01.webp",
            name: "Margarita James",
            title: "MSC, Instructor",
            rating: 4.9,
          },
          {
            image: "/author-02.webp",
            name: "Mitchell Colon",
            title: "BBA, Instructor",
            rating: 4.9,
          },
          {
            image: "/author-03.webp",
            name: "Sonya Gordon",
            title: "MBA, Instructor",
            rating: 4.9,
          },
          {
            image: "/author-04.webp",
            name: "Archie Neal",
            title: "BBS, Instructor",
            rating: 4.9,
          },
        ]}
      />
    ),
  },
  {
    title: "Review",
    Component: (
      <ReviewSection
        reviews={[
          {
            id: 1,
            image: "/author-06.webp",
            name: "Sara Alexander",
            designation: "Product Designer, USA",
            star: "⭐⭐⭐⭐",
            comment:
              "Lorem Ipsum has been the industrys standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.",
          },
          {
            id: 2,
            image: "/author-07.webp",
            name: "Koral Batchman",
            designation: "Product Designer, USA",
            star: "⭐⭐⭐⭐",
            comment:
              "Lorem Ipsum has been the industrys standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.",
          },
          {
            id: 3,
            image: "/author-03.webp",
            name: "Gertude Culbertson",
            designation: "Product Designer, USA",
            star: "⭐⭐⭐⭐",
            comment:
              "Lorem Ipsum has been the industrys standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.",
          },
        ]}
      />
    ),
  },
];

const DetailsPageMainSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: any) => {
    setActiveIndex(index);
  };

  return (
    <>
      <section className="flex bg-emerald-50 h-[80px] justify-center items-center p-3 gap-6 w-full">
        {COMPONENT_ARR?.map((singleCom, index) => (
          <div
            onClick={() => handleTabClick(index)}
            className={`${activeIndex === index ? "bg-green-500" : "bg-white"
              } rounded-md p-1 hover:bg-green-500 cursor-pointer h-10 w-36 text-center`}
          >
            <p className="text-gray-800 text-lg">{singleCom?.title}</p>
          </div>
        ))}
      </section>
      <div className="w-full mb-12 mt-3">
        {COMPONENT_ARR[activeIndex]?.Component}
      </div>
    </>
  );
};

export default DetailsPageMainSection;
