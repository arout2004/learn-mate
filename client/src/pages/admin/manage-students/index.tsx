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

const ManageStudents = () => {
  return (
    <AdminLayout title="Manage Students | Learn-Mate">
      <section className="w-full">
        <CourseStudentList />
      </section>
    </AdminLayout>
  );
};
export default ManageStudents;

const fakeData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    courses: [
      { name: "Mathematics", price: 50, purchaseDate: "2023-04-12" },
      { name: "Physics", price: 40, purchaseDate: "2023-05-20" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    courses: [{ name: "Chemistry", price: 45, purchaseDate: "2023-03-05" }],
  },
];

const CourseStudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

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
              Student List
            </p>
          </div>
        }
        data={fakeData.map((item, i) => ({
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
            title: "Courses",
            field: "courses",
            render: (rowData: any) => (
              <Button
                onClick={() => setSelectedStudent(rowData)}
                color="primary"
              >
                View Courses
              </Button>
            ),
          },
          {
            title: "Actions",
            field: "",
            render: (rowData) => (
              <Button
                onClick={() => handleDelete(rowData.id)}
                color="secondary"
              >
                Delete
              </Button>
            ),
          },
        ]}
      />
      <Dialog open={selectedStudent !== null} onClose={handleClose}>
        <DialogTitle>{selectedStudent?.name}'s Courses</DialogTitle>
        <DialogContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purchase Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedStudent?.courses.map((course: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {course.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course.purchaseDate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  { label: "Purchase Date", key: "purchaseDate" },
  { label: "Status", key: "courseStatus" },
];
