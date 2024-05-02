import { MenuBook, Schedule } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export interface COURSE_CARD_TYPE {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
  category: any;
  salePrice: number;
  mrp: number;
}

const CourseCard = ({ item }: { item: COURSE_CARD_TYPE }) => {
  return (
    <div className="h-full w-full space-y-3 bg-transparent p-5 rounded-lg border hover:border-green-300 cursor-pointer">
      <Link href={`/courses/${item?._id}`}>
        <img
          src={item?.thumbnail}
          className="w-full h-[18rem] rounded-xl shadow-lg"
        />
        <div className="flex items-center w-full h-[4rem] mt-4 ml-4">
          <img
            src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <div className="flex justify-around items-center w-full">
            <p className="text-md ml-2">ADMIN</p>
            <button className="bg-[#E7F8EE] text-green-500 w-full h-10  ml-3 rounded-lg">
              {item?.category?.name}
            </button>
          </div>
        </div>
        <p className="hover:text-green-500 w-full ml-5 text-gray-900 font-medium text-lg">
          {item?.name}
        </p>
        <p className="hover:text-green-500 w-full ml-5 text-gray-600 text-sm">
          {item?.description}
        </p>
        <div className=" flex justify-between mx-5 my-5 text-sm">
          <div>
            <Schedule className=" text-green-700 mr-1" />
            unlimited Access
          </div>
          <div>
            <MenuBook className=" text-green-700" /> Lecture 27
          </div>
        </div>
        <div className=" bg-[#EEFBF3] px-3 py-6  h-14 rounded-xl flex items-center justify-between">
          <p className="text-blue-700 font-bold text-xl">
            salePrice: {item?.salePrice}
          </p>
          <p className="text-red-700 font-bold text-xl line-through">
            MRP: {item?.mrp}
          </p>
          <Button className="bg-green-200"> view course </Button>
          {/* <p className="">
          {item.rating}{" "}
          <span>
            {" "}
            <Star className="text-yellow-500  text-lg" />
            <Star className="text-yellow-500 text-lg" />
            <Star className="text-yellow-500 text-lg" />
            <Star className="text-yellow-500 text-lg" />
            <StarBorder className="text-yellow-500 text-lg" />{" "}
          </span>
        </p> */}
        </div>
      </Link>
    </div>
  );
};
export default CourseCard;
