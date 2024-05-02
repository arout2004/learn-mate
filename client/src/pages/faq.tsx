import { CommonHeroSection } from "@/components/core";
import { PublicLayout } from "@/layouts";
import React from "react";
import { ExpandMore } from "@mui/icons-material";
import { Collapse, Typography } from "@mui/material";
import { useState } from "react";

const FAQs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, simply navigate to the course page and click on the 'Enroll' button. Follow the on-screen instructions to complete the enrollment process. Once enrolled, you will have access to all the course materials and can begin learning at your own pace.",
  },
  {
    question: "Can I access the course materials offline?",
    answer:
      "No, you need an internet connection to access the course materials. However, you can download certain materials for offline viewing, such as lecture slides or reading materials. This allows you to study even when you don't have an internet connection.",
  },
  {
    question: "How long do I have access to a course after enrolling?",
    answer:
      "You have lifetime access to the course materials once you enroll. This means you can revisit the course materials at any time, even after you have completed the course. You will also have access to any updates or additions made to the course in the future.",
  },
  {
    question: "Can I get a refund if I am not satisfied with a course?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you are not satisfied with a course for any reason, you can request a refund within 30 days of your purchase. Our goal is to ensure that you are completely satisfied with your learning experience.",
  },
  {
    question: "Are there any prerequisites for enrolling in a course?",
    answer:
      "Prerequisites vary depending on the course. You can find the prerequisites listed on the course page under the 'Requirements' section. It is important to review these requirements before enrolling to ensure that you have the necessary background knowledge to successfully complete the course.",
  },
  {
    question: "Can I switch to a different course after enrolling in one?",
    answer:
      "Yes, you can switch to a different course after enrolling in one. Please contact our support team for assistance with switching courses. Our team will be happy to help you find a course that better suits your learning goals and interests.",
  },
  {
    question: "Do you offer certificates upon course completion?",
    answer:
      "Yes, we offer certificates of completion for all our courses. Certificates are available for download upon completing a course. These certificates can be a valuable addition to your resume and can help you showcase your skills and knowledge to potential employers.",
  },
  {
    question: "How can I contact the course instructor?",
    answer:
      "You can contact the course instructor through the course discussion forum or by sending a message through our platform. Instructors are typically very responsive and are happy to answer any questions you may have about the course content or assignments.",
  },
  // Add more FAQs as needed
];

const FaqSection = () => {
  return (
    <PublicLayout title="FAQs | Learn-Mate">
      <CommonHeroSection title="FAQs" />
      <section className="w-full bg-white p-2 rounded-3xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] main-container md:my-20 my-6">
        <h2 className="lg:text-4xl text-2xl font-semibold text-secondary flex justify-center items-center py-2">
          Frequently Asked Questions
        </h2>
        <ul className="flex flex-col">
          {FAQs.map((faq: any, index: number) => (
            <Accordion key={index} idx={index + 1} faq={faq} />
          ))}
        </ul>
      </section>
    </PublicLayout>
  );
};

export default FaqSection;

const Accordion = ({ idx, faq }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="bg-white my-2 shadow-sm">
      <h2
        onClick={handleClick}
        className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100/50"
      >
        <p className="flex gap-2">
          <span className="text-gray-700">{idx}.</span>
          <span className="text-md">{faq.question}</span>
        </p>
        <ExpandMore
          className={`text-purple-700 h-6 w-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </h2>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="border-l-2 border-purple-600 overflow-hidden pb-2">
          <Typography className="px-3 pt-3 pb-1 text-gray-900 text-sm">
            {faq?.answer}
          </Typography>
          {/* <p className="px-3">
            <a href={faq?.linkUrl} className="text-blue-600 hover:underline">
              {faq?.linkUrl}
            </a>
          </p> */}
        </div>
      </Collapse>
    </li>
  );
};
