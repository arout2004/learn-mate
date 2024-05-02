import useAdminSidebarItems from "@/hooks/useAdminSidebarItems";
import useAuth from "@/hooks/useAuth";
import {
  BadgeOutlined,
  KeyboardDoubleArrowRight,
  KeyOutlined,
  LogoutOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Avatar, Badge, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ResponsiveDrawer from "./ResponsiveDrawer";

const AdminNavbar = () => {
  const { user, logOut } = useAuth();
  const MenuItems = useAdminSidebarItems();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openProfile = Boolean(profileAnchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  //? handle logout
  const onLogout = async () => {
    try {
      const { value } = await Swal.fire({
        title: "Are you sure?",
        text: "Want to LogOut",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5B50A1",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes LogOut",
        cancelButtonText: "No Cancel",
      });
      if (!value) return;
      await logOut();
      toast.success(`Logged out successfully`);
      return router.replace("/");
    } catch (error) {}
  };

  return (
    <nav className="sticky top-5 z-[90] w-full h-16 flex items-center mb-5 bg-white rounded-lg p-2">
      <section className="w-full flex justify-between gap-4">
        <div className="w-full flex items-center justify-between gap-4">
          <ResponsiveDrawer />
          <div className="w-[30%] md:w-full overflow-x-auto overflow-y-hidden">
            <div className="flex items-center text-sm md:text-lg lg:text-2xl tracking-wider font-semibold capitalize">
              {MenuItems.find((item) => item.route === router.pathname)?.title}
              {
                MenuItems?.find((item) =>
                  item?.submenus?.find(
                    (submenus) => submenus.route === router?.pathname
                  )
                )?.title
              }
              {MenuItems.find((item) =>
                item?.submenus?.find(
                  (submenus) => submenus.route === router?.pathname
                )
              )?.title ? (
                <span className="text-primary px-2 pb-1">
                  <KeyboardDoubleArrowRight className="!text-lg" />
                </span>
              ) : (
                <span> </span>
              )}
              {
                MenuItems?.find((item) =>
                  item?.submenus?.find(
                    (submenus) => submenus.route === router?.pathname
                  )
                )?.submenus?.find(
                  (submenus) => submenus.route === router?.pathname
                )?.title
              }
            </div>
          </div>
          <aside className="w-1/4 flex gap-5 items-center justify-end">
            <Link
              href={`/`}
              className="hidden md:block mr-2 bg-gray-200 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-300/80 common-transition"
            >
              <p className="text-md font-semibold">Browse Website</p>
            </Link>
            <div className="">
              <Button
                id="basic-button"
                aria-controls={openProfile ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
                onClick={handleProfileClick}
              >
                <Avatar
                  src={user?.dp}
                  sx={{
                    height: "2.5rem",
                    width: "2.5rem",
                    backgroundColor: "#0e0e66",
                  }}
                ></Avatar>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={profileAnchorEl}
                open={openProfile}
                onClose={handleProfileClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfileClose}>
                  <aside className="flex flex-col px-3 pb-2">
                    <p className="text-lg font-semibold capitalize">
                      {user?.name}
                    </p>
                    <p className="text-lg font-medium">{user?.email}</p>
                  </aside>{" "}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleProfileClose}>
                  <Link href="/admin/my-profile">
                    <p className="flex gap-2 items-center px-3  py-2 text-base tracking-wider font-medium cursor-pointer">
                      <BadgeOutlined className="!text-primary !text-3xl" />
                      My Profile
                    </p>
                  </Link>{" "}
                </MenuItem>
                <MenuItem onClick={handleProfileClose}>
                  {" "}
                  <div
                    className="flex gap-2 items-center px-3 cursor-pointer py-2 text-base tracking-wider font-medium"
                    onClick={onLogout}
                  >
                    <LogoutOutlined className="!text-primary !text-3xl" />
                    <p className="">Log Out</p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </aside>
        </div>
      </section>
    </nav>
  );
};

export default AdminNavbar;
