import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  PhoneInTalkOutlined,
  Twitter,
} from "@mui/icons-material";

export const UpperNav = () => {
  return (
    <div className="hidden lg:block bg-[#212832] w-full h-12 text-white">
      <div className="h-12 flex justify-between items-center relative main-container">
        <div className="">
          <p>
            All course 28% off for{" "}
            <a href="#" className="text-green-600">
              Liberian people’s.
            </a>
          </p>
        </div>

        <div className="mr-9">
          <div className="top-info flex gap-4 items-center ">
            <img
              src="/shape-1.webp"
              alt=""
              className="h-[14px] w-[41px] mr-11"
            />
            <p className="hover:text-green-600 mr-7">
              {" "}
              <a href="tel:9702621413">
                {" "}
                <PhoneInTalkOutlined className="text-green-600 " /> &nbsp;
                &nbsp;(970) 262-1413
              </a>
            </p>
            <p className="hover:text-green-600">
              {" "}
              <a href="mailto:address@gmail.com">
                {" "}
                <Email className="text-green-600 ml-3" />
                &nbsp; &nbsp;address@gmail.com
              </a>
            </p>
            <img
              src="/shape-2.webp"
              alt=""
              className="h-[14px] w-[41px] ml-11"
            />
          </div>
        </div>

        <div className="relative">
          <ul className="social flex gap-2">
            <li>
              <a href="#">
                {" "}
                <Facebook />{" "}
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <Twitter />{" "}
              </a>
            </li>
            <li>
              <a href="#">
                <LinkedIn />{" "}
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <Instagram />{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
