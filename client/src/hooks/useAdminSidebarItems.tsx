import {
  BadgeOutlined,
  GridView,
  PeopleOutline,
  PersonOutline,
  SettingsOutlined,
  TopicOutlined,
} from "@mui/icons-material";

const useAdminSidebarItems = () => {
  return [
    {
      _id: "1",
      title: "Dashboard",
      route: "/admin",
      icon: <GridView />,
    },
    {
      _id: "2",
      title: "Categories",
      route: "/admin/manage-categories",
      icon: <TopicOutlined />,
    },
    {
      _id: "3",
      title: "Courses",
      route: "/admin/manage-courses",
      icon: <TopicOutlined />,
    },
    {
      _id: "4",
      title: "Contacts",
      route: "/admin/manage-contacts",
      icon: <PersonOutline />,
    },
    {
      _id: "5",
      title: "Students",
      route: "/admin/manage-students",
      icon: <PeopleOutline />,
    },
    {
      _id: "6",
      title: "Settings",
      icon: <SettingsOutlined />,
      submenus: [
        {
          _id: "6-0",
          route: "/admin/settings/my-profile",
          title: "MyProfile",
          icon: <BadgeOutlined />,
        },
      ],
    },
  ];
};
export default useAdminSidebarItems;
