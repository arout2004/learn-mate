import React from "react";
import LectureCollapse from "./LectureCollapse";

const CourseContentSection = ({ course, lectures, isPurchased }: any) => {
  return (
    <section className="mt-3 mb-12">
      <h1 className="text-gray-700 text-2xl font-semibold my-3">
        Course Contents
      </h1>
      {lectures?.length === 0 ? (
        <div className="border rounded-sm p-2">
          <p className="text-center text-2xl text-gray-600">
            No Content Available.
          </p>
        </div>
      ) : (
        <aside className="border rounded-sm p-2">
          {lectures?.map((item: any) => (
            <LectureCollapse
              key={item._id}
              data={item}
              isPurchased={isPurchased}
            />
          ))}
        </aside>
      )}
    </section>
  );
};

export default CourseContentSection;
