// useCourses.js
import { getCourses } from "@/apiCalls/course";
import { useState, useEffect, useMemo } from "react";

export const useCourses = () => {
  const courseKey = "courseData";
  const [allCourses, setAllCourses] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Fetch courses from local storage on component mount
      getCourses(null).then((data:any)=> {
        setAllCourses(data?.courses);
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, []);

  const updateCourses = useMemo(
    () => (updatedCourses: any) => {
      try {
        // Update local storage with the modified array
        localStorage.setItem(courseKey, JSON.stringify(updatedCourses));

        // Update state to trigger re-render
        setAllCourses([...updatedCourses]);
      } catch (error) {
        console.error("Error updating courses:", error);
      }
    },
    [setAllCourses]
  );

  return { allCourses, updateCourses };
};
