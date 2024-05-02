import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import useMutation from "@/hooks/useMutation";
const LectureForm = ({ open, isEdit, handleClose, data, mutate }: any) => {
  const router = useRouter();
  const { mutation } = useMutation();
  const initialValues = {
    title: "",
    description: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEdit
      ? {
          title: data?.title,
          description: data?.description,
        }
      : initialValues,
    validationSchema: yup.object({
      title: yup
        .string()
        .required("Lecture title is required")
        .min(3, "Lecture title must be at least 3 characters")
        .max(50, "Lecture title cannot exceed 50 characters"),
      description: yup.string().required("Lecture description is required"),
    }),
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;
        const updateLec = {
          title: values?.title,
          description: values?.description,
        };
        if (isEdit) {
          res = await mutation(`api/lectures/${data?._id}`, {
            method: "PUT",
            body: updateLec,
            isAlert: true,
          });
          mutate?.();
          handleClose();
        }
        if (!isEdit) {
          res = await mutation(`api/lectures/${router?.query?.courseId}`, {
            method: "POST",
            body: updateLec,
            isAlert: true,
          });
          mutate?.();
          handleClose();
          resetForm();
        } else {
        }
      } catch (error) {}
    },
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle className="flex items-center justify-center">
        <p className="text-3xl font-bold py-2">
          {isEdit ? "Update lecture" : "Add Lecture"}
        </p>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-lg text-gray-600  col-span-12">
              Lecture Title
              <span className="ml-1 text-red-500"> *</span>
              <input
                type="text"
                name="title"
                placeholder="Enter lecture title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full col-span-12 mt-6 overflow-hidden border-b-2 border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="text-lg text-gray-600  col-span-12">
              Lecture Description
              <span className="ml-1 text-red-500"> *</span>
              <textarea
                name="description"
                placeholder="Enter lecture description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full col-span-12 mt-6 overflow-hidden border-b-2 border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="w-full flex items-center justify-center mt-6">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`bg-primary/90 px-8 py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : "opacity-100"
                }`}
              >
                {isEdit ? "Update" : "Add Lecture"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
      <DialogActions className="absolute top-2 right-3">
        <Close onClick={handleClose} className="text-red-600 cursor-pointer" />
      </DialogActions>
    </Dialog>
  );
};

export default LectureForm;
