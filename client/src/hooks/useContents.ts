import { useState, useEffect, useMemo } from "react";

export const useContents = () => {
  const contentKey = "contents";
  const [allContents, setAllContents] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Fetch Contents from local storage on component mount
      const contents =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem(contentKey) || "[]")
          : [];

      setAllContents(contents);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  }, []);

  const updateContents = useMemo(
    () => (updatedContent: any) => {
      try {
        // Update local storage with the modified array
        localStorage.setItem(contentKey, JSON.stringify(updatedContent));

        // Update state to trigger re-render
        setAllContents([...updatedContent]);
      } catch (error) {
        console.error("Error updating contents:", error);
      }
    },
    [setAllContents]
  );

  return { allContents, updateContents };
};
