import React, {useEffect} from "react";
import { AdminLayout } from "@/layouts";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router = useRouter();
  const {user} = useAuth();
  const topCourses = [
    { name: "Course A", sold: 50 },
    { name: "Course B", sold: 45 },
    { name: "Course C", sold: 40 },
    { name: "Course D", sold: 35 },
    { name: "Course E", sold: 30 },
  ];

  useEffect(()=> {
    if(!user?._id) {
      router.replace("/login");
    }
    else {
      if(user?.role !== "admin") {
        router.replace("/");
      }
    }
  }, [user]);

  return (
    <AdminLayout title="Dashboard | Learn-Mate">
      <section className="flex justify-center items-center w-full h-full bg-green-400/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-12 mx-3">
          <AdminDashboardCard
            title="Total Courses"
            value={400}
            size="large"
            style="primary"
          />
          <AdminDashboardCard
            title="Total Earnings"
            value={200000}
            size="large"
            style="secondary"
          />
          <AdminDashboardCard
            title="Total Students"
            value={750}
            size="large"
            style="tertiary"
          />
          <AdminDashboardCard
            title="Total Contacts"
            value={60}
            size="large"
            style="quaternary"
          />
          <AdminDashboardCard
            title="Total Lectures"
            value={250}
            size="small"
            style="primary"
          />
          <AdminDashboardCard
            title="Total Categories"
            value={20}
            size="small"
            style="secondary"
          />
          <AdminDashboardCard
            title="Total Courses Sold"
            value={270}
            size="small"
            style="tertiary"
          />
          <AdminDashboardCard
            title="Top Five Courses"
            value={<TopCoursesList courses={topCourses} />}
            size="large"
            style="quaternary"
          />
        </div>
      </section>
    </AdminLayout>
  );
};

const TopCoursesList = ({ courses }: any) => {
  return (
    <ul className="list-disc list-inside">
      {courses.map((course: any, index: number) => (
        <li key={index}>{`${course.name}: ${course.sold}`}</li>
      ))}
    </ul>
  );
};

export default AdminDashboard;

const AdminDashboardCard = ({ title, value, size, style }: any) => {
  let cardSizeClass = "";
  let cardStyleClass = "";

  switch (size) {
    case "small":
      cardSizeClass = "w-72 h-72";
      break;
    case "medium":
      cardSizeClass = "w-48 h-48";
      break;
    case "large":
      cardSizeClass = "w-72 h-72";
      break;
    default:
      cardSizeClass = "w-48 h-48";
  }

  switch (style) {
    case "primary":
      cardStyleClass = "bg-blue-500 text-white";
      break;
    case "secondary":
      cardStyleClass = "bg-green-500 text-white";
      break;
    case "tertiary":
      cardStyleClass = "bg-yellow-500 text-white";
      break;
    case "quaternary":
      cardStyleClass = "bg-purple-500 text-white";
      break;
    default:
      cardStyleClass = "bg-blue-500 text-white";
  }

  return (
    <section
      className={`flex justify-center items-center rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 ${cardSizeClass} ${cardStyleClass}`}
    >
      <div className="flex flex-col justify-center items-center h-full p-4">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </section>
  );
};
