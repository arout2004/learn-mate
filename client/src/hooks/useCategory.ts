import { getAllCategories } from "@/apiCalls/category";
import { useState, useEffect } from "react";

export const useCategories = () => {
  const categoriesKey = "categories";
  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    // Fetch categories from local storage on component mount
    getAllCategories().then((data:any)=> {
      console.log("data: ",data);
      setAllCategories(data?.categories);
    }).catch((error:any)=> console.log("error: ",error));
  }, []);

  const updateCategories = (updatedCategories: any) => {
    // Update local storage with the modified array
    localStorage.setItem(categoriesKey, JSON.stringify(updatedCategories));

    // Update state to trigger re-render
    setAllCategories([...updatedCategories]); // Spread the array to create a new reference
  };

  return { allCategories, updateCategories };
};
