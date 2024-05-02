import { AdminLayout } from "@/layouts";
import React from "react";
import { Avatar, Paper, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <AdminLayout title="Manage Profile | Learn-Mate">
      <section className="flex flex-col items-center justify-center h-full">
        <Paper
          elevation={3}
          className="w-[35rem] h-[25rem] rounded-2xl bg-green-100/30 text-center text-black font-semibold"
        >
          <Avatar
            alt="Profile Image"
            src={user?.dp}
            className="mx-auto my-10 border border-green-700"
            sx={{ width: 150, height: 150, marginBottom: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {user?.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {user?.email}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className="font-semibold text-black"
          >
            Role: {user?.role}
          </Typography>
        </Paper>
      </section>
    </AdminLayout>
  );
};

export default AdminProfile;
