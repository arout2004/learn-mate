import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";

export const useUserRegistration = () => {
  const usersKey = "users";
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Fetch users from local storage on component mount
      const users =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem(usersKey) || "[]")
          : [];

      setAllUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const registerUser = useMemo(
    () => (userData: any) => {
      try {
        // Fetch existing users from local storage or set to an empty array
        const existingUsers = JSON.parse(
          localStorage.getItem(usersKey) || "[]"
        );

        // Add the new user to the array
        const updatedUsers = [...existingUsers, userData];

        // Update local storage with the modified array
        localStorage.setItem(usersKey, JSON.stringify(updatedUsers));

        // Show success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully registered.",
        });

        // Update state to trigger re-render
        setAllUsers(updatedUsers);
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
    [setAllUsers]
  );

  return { allUsers, registerUser };
};
