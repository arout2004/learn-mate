// useLectures.js
import { useState, useEffect, useMemo } from "react";

export const useLectures = () => {
  const lecturesKey = "lectures";
  const [allLectures, setAllLectures] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Fetch lectures from local storage on component mount
      const lectures =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem(lecturesKey) || "[]")
          : [];

      setAllLectures(lectures);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  }, []);

  const updateLectures = useMemo(
    () => (updatedLectures: any) => {
      try {
        // Update local storage with the modified array
        localStorage.setItem(lecturesKey, JSON.stringify(updatedLectures));

        // Update state to trigger re-render
        setAllLectures([...updatedLectures]);
      } catch (error) {
        console.error("Error updating lectures:", error);
      }
    },
    [setAllLectures]
  );

  return { allLectures, updateLectures };
};
