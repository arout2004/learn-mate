import { AdminLayout } from "@/layouts";
import React from "react";
import MaterialTable from "@material-table/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { MuiTblOptions } from "@/utils/MuiTblOptions";
import { useState } from "react";
import useSWRAPI from "@/hooks/useSWRAPI";

const ManageContacts = () => {
  return (
    <AdminLayout title="Manage Contacts | Learn-Mate">
      <section className="w-full">
        <ContactDetails />
      </section>
    </AdminLayout>
  );
};
export default ManageContacts;

const fakeData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Query regarding course",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Feedback on the course",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const ContactDetails = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { data } = useSWRAPI("api/contacts/");
  const handleClose = () => {
    setSelectedStudent(null);
  };

  const handleDelete = (id: any) => {};

  return (
    <div className="m-auto px-4 py-4">
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={5} />,
        }}
        title={
          <div className="flex gap-2">
            <p className="text-lg text-primary font-semibold uppercase ">
              Contact List
            </p>
          </div>
        }
        data={data?.data?.contacts?.map((item: any, i: number) => ({
          ...item,
          slNo: i + 1,
        }))}
        options={{
          ...(MuiTblOptions() as any),
          headerStyle: {
            position: "sticky",
            zIndex: 1,
            backgroundColor: "#00ADEC",
            height: "70px",
            whiteSpace: "nowrap",
            color: "white",
            top: 0,
            fontWeight: "bold",
            fontSize: "18px",
          },
          draggable: false,
          pageSize: 10,
          selection: false,

          filtering: false,
        }}
        style={{
          ...(MuiTblOptions as any),
        }}
        columns={[
          {
            title: "#",
            field: "slNo",
            editable: "never",
            width: "2%",
            render: (rowData) => <p>{rowData.slNo}</p>,
          },
          {
            title: "Name",
            field: "name",
            searchable: true,
          },
          {
            title: "Email",
            field: "email",
            searchable: true,
          },
          {
            title: "Subject",
            field: "subject",
            searchable: true,
          },
          {
            title: "Message",
            field: "message",
            searchable: false,
            sorting: false,
            render: (rowData) => (
              <Button
                onClick={() => setSelectedStudent(rowData)}
                color="primary"
              >
                View Message
              </Button>
            ),
          },
          // {
          //   title: "Actions",
          //   field: "",
          //   render: (rowData) => (
          //     <Button
          //       onClick={() => handleDelete(rowData._id)}
          //       color="secondary"
          //     >
          //       Delete
          //     </Button>
          //   ),
          // },
        ]}
      />
      <Dialog open={selectedStudent !== null} onClose={handleClose}>
        <DialogTitle>{selectedStudent?.name}'s Message</DialogTitle>
        <DialogContent>
          <div className="overflow-x-auto">
            <div className="min-w-full divide-y divide-gray-200">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1" color="textPrimary">
                    <strong>Message:</strong> {selectedStudent?.message}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const headers = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "subject", key: "subject" },
  { label: "message", key: "message" },
];
