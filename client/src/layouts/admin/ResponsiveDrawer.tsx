import useAdminSidebarItems from "@/hooks/useAdminSidebarItems";
import useAuth from "@/hooks/useAuth";
import {
  Close,
  ExpandLess,
  ExpandMore,
  Logout,
  Menu,
} from "@mui/icons-material";
import {
  Collapse,
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ResponsiveDrawer = () => {
  const [open, setOpen] = useState(false); // State to manage drawer open/close
  const router = useRouter();
  const MenuItems = useAdminSidebarItems();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const { logOut, user } = useAuth();
  useEffect(() => {
    if (!MenuItems?.length || !router?.asPath) return;
    const isExists =
      MenuItems?.length &&
      MenuItems?.find(
        (item) =>
          item?.submenus?.length &&
          item?.submenus?.find((data) => data?.route === router?.asPath)
      );

    isExists && setSelectedSubMenu(isExists?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.asPath, MenuItems?.length]);

  const handleDrawerToggle = () => {
    setOpen(!open);
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
    <Fragment>
      {/* Menu button for small and medium screens */}
      <div className="lg:hidden block px-1 py-3">
        <span className="" onClick={() => setOpen(!open)}>
          {open ? (
            <Close className="!text-3xl !text-red-600" />
          ) : (
            <Menu className="!text-3xl !text-primary" />
          )}
        </span>
      </div>

      {/* Responsive Drawer */}
      <MuiDrawer
        anchor={`left`}
        open={open}
        onClose={handleDrawerToggle}
        className="lg:w-60 xl:w-72 lg:p-5 xl:p-8"
      >
        {/* Your existing sidebar code */}
        <div className="px-4 py-3">
          <img
            src="/logo.webp"
            alt="EduHub"
            className="w-40 cursor-pointer"
            onClick={() => router.push("/admin")}
          />
        </div>

        {/* Main menus section */}
        <div className="flex flex-col w-full">
          {MenuItems?.map((menuItem) => (
            <Fragment key={menuItem?._id}>
              <Tooltip
                title={menuItem?.title}
                followCursor
                arrow
                placement="top-end"
              >
                <div
                  className={`w-full group flex items-center justify-between px-4 py-3 text-gray-500 hover:text-primary hover:bg-primary/10 transition-all duration-150 ease-in-out cursor-pointer border-l-4  ${
                    router.asPath === menuItem.route
                      ? "bg-primary/10 text-primary border-primary/75"
                      : "border-transparent"
                  }`}
                  onClick={() => {
                    if (menuItem?.route) return router?.push(menuItem?.route);
                    menuItem?.submenus &&
                      setSelectedSubMenu((prev) =>
                        prev === menuItem._id ? "" : menuItem._id
                      );
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="">{menuItem?.icon}</span>

                    <p className={`font-medium whitespace-nowrap`}>
                      {menuItem?.title}
                    </p>
                  </div>
                  {menuItem?.submenus ? (
                    selectedSubMenu === menuItem?._id ? (
                      <span className="">
                        <ExpandLess />
                      </span>
                    ) : (
                      <span className="">
                        <ExpandMore />
                      </span>
                    )
                  ) : null}
                </div>
              </Tooltip>

              {/* //? submenus section */}
              {menuItem?.submenus ? (
                <Collapse
                  in={selectedSubMenu === menuItem?._id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {menuItem?.submenus?.map((submenu: any) => (
                      <ListItemButton
                        key={submenu?._id}
                        onClick={() => router.push(submenu?.route)}
                        selected={router.pathname === submenu.route}
                        className={`!flex !items-center !gap-1 hover:!bg-primary/10 !text-gray-500 hover:!text-primary !border-l-4 common-transition  ${
                          router.asPath === submenu.route
                            ? "!bg-primary/10 !text-primary !border-primary"
                            : "!border-transparent"
                        }`}
                      >
                        {submenu?.icon}
                        <h4 className="font-medium whitespace-nowrap">
                          {submenu?.title}
                        </h4>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              ) : null}
            </Fragment>
          ))}

          {/* //? logout section */}
          <Tooltip
            title={`${"LogOut"}`}
            followCursor
            arrow
            placement="top-end"
            sx={{
              zIndex: "9900",
            }}
          >
            <div
              onClick={onLogout}
              className={`w-full group flex items-center justify-between text-gray-500 hover:text-primary px-5 py-3 hover:bg-primary/10 common-transition cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <span className="group-hover:text-primary">
                  <Logout />
                </span>
                <p className="font-medium whitespace-nowrap">LogOut</p>
              </div>
            </div>
          </Tooltip>
        </div>
      </MuiDrawer>
    </Fragment>
  );
};

export default ResponsiveDrawer;
