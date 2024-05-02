import { CommonHeroSection } from "@/components/core";
import useAuth from "@/hooks/useAuth";
// import { useAuth } from "@/hooks/useAuth";
import { PublicLayout } from "@/layouts";
import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import React from "react";

const MyProfile = () => {
  const { user } = useAuth();

  const student = {
    id: 1,
    name: user?.name,
    bio: "Computer Science student at University of California.",
    email: user?.email,
    stream: "Computer Science",
    contact: "886885858758",
    profilePicture: user?.dp,
    backgroundPicture: "/backgroundimage.jpg",
    socialMedia: {
      github: "https://github.com/yourusername",
      instagram: "https://www.instagram.com/yourusername",
      linkedin: "https://www.linkedin.com/in/yourusername",
      facebook: "https://www.facebook.com/yourusername",
    },
  };

  return (
    <PublicLayout title="My profile | Learn-Mate">
      <CommonHeroSection title="Myprofile" />

      <div className="container relative main-container mx-auto mt-8">
        <div>
          <img
            src={student.backgroundPicture}
            className="h-72 w-full relative"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center bg-emerald-300 h-24 w-24 lg:h-32 lg:w-32 rounded-full absolute left-1/2 top-72 -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-72 lg:-translate-x-1/2 lg:-translate-y-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:left-1/2 md:top-[53%]">
          <img
            src={student.profilePicture}
            alt={student.name}
            className="rounded-full object-cover h-20 w-20 lg:h-28 lg:w-28  shadow-md shadow-black"
          />
        </div>
        <div className="lg:p-16 p-10 grid items-center text-center">
          <h1 className="text-4xl font-bold">{student?.name}</h1>
          <h1 className="text-gray-600 text-lg mb-4">{student.bio}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-700 font-semibold">Email</p>
              <p className="text-gray-600">{student.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Stream</p>
              <p className="text-gray-600">{student.stream}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Contact</p>
              <p className="text-gray-600">{student.contact}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href={student.socialMedia.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub style={{ fontSize: 32, color: "#333" }} />
            </a>
            <a
              href={student.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram style={{ fontSize: 32, color: "#E1306C" }} />
            </a>
            <a
              href={student.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn style={{ fontSize: 32, color: "#0077B5" }} />
            </a>
            <a
              href={student.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook style={{ fontSize: 32, color: "#1877F2" }} />
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default MyProfile;
