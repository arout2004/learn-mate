import Link from "next/link";

const InstructorSections = () => {
  return (
    <div className="  w-full h-96 grid main-container    ">
      <div className=" bg-[#E7F8EE] w-[90%]  place-self-center  h-60 rounded-lg">
        <div className="   ">
          {/* <img className=" " src="/shape-12.webp" alt="Shape" /> */}
          {/* <img className=" " src="/shape-12.webp" alt="Shape" /> */}

          <div className=" grid   lg:grid-cols-[35%,30%,35%]  items-center  ">
            {/* Section Title Start */}
            <div className="  h-40  pl-20 pt-10">
              <h5 className=" text-md lg:text-xl text-green-700 mb-4">
                Become A Instructor
              </h5>
              <p className=" text-xl lg:text-3xl mb-0  leading-snug  ">
                You can join with Learn Mate as{" "}
                <span className=" text-green-700">
                  a instructor?
                  <img
                    src="/shape-4.webp"
                    alt=""
                    className="hidden md:block lg:block ml-28 mt-2"
                  />
                </span>
              </p>
            </div>
            {/* Section Title End */}
            <img
              className=" hidden lg:block  h-24 w-30  relative  top-11  left-36  "
              src="/shape-13.svg"
              alt="Shape"
            />

            <div className="   text-center">
              <Link href="/contact">
                <button className="bg-green-600 lg:mt-20 w-40  lg:w-52 rounded-lg text-white  h-14 text-center">
                  Drop Information
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSections;
