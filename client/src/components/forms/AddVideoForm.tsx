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
const AddVideoForm = ({ open, isEdit, handleClose, data, mutate }: any) => {
  const router = useRouter();
  const { mutation } = useMutation();
  const initialValues = {
    videoTitle: "",
    videoDescription: "",
    videoUrl: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEdit
      ? {
          videoTitle: data?.videoTitle,
          videoDescription: data?.videoDescription,
          videoUrl: data?.videoUrl,
        }
      : initialValues,
    validationSchema: yup.object({
      videoTitle: yup.string().required("Title is required"),
      videoDescription: yup
        .string()
        .required("video Description is required")
        .min(20, "video Description must be at least 20 characters"),
      videoUrl: yup
        .string()
        .url("Please enter a valid embed URL")
        .required("URL is required"),
    }),
    onSubmit: async (values: any, { resetForm }: any) => {
      try {
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;
        console.log("values-->", values);
        if (isEdit) {
          res = await mutation(`api/videos/${data?._id}`, {
            method: "PUT",
            body: {
              videoTitle: values?.videoTitle,
              videoDescription: values?.videoDescription,
              videoUrl: values?.videoUrl,
            },
            isAlert: true,
          });
          mutate?.();
          handleClose();
        }
        if (!isEdit) {
          res = await mutation(`api/videos/${router?.query?.lectureId}`, {
            method: "POST",
            body: {
              videoTitle: values?.videoTitle,
              videoDescription: values?.videoDescription,
              videoUrl: values?.videoUrl,
            },
            isAlert: true,
          });
          mutate?.();
          handleClose();
          formik.resetForm();
        } else {
        }
      } catch (error) {}
    },
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle className="flex items-center justify-center">
        <p className="text-3xl font-bold py-2">
          {isEdit ? "Update Video" : "Add Video"}
        </p>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-lg text-gray-600  col-span-12">
              Add Video Title
              <span className="ml-1 text-red-500"> *</span>
              <input
                name="videoTitle"
                placeholder="Write the video title"
                value={formik.values.videoTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 text-sm col-span-12 mt-2 overflow-hidden border-2 border-gray-300 focus:border-primary"
              />
            </div>
            {formik.touched.videoTitle && formik.errors.videoTitle && (
              <div className="text-red-500 text-sm">
                {formik.errors.videoTitle as string}
              </div>
            )}
            <div className="text-lg text-gray-600  col-span-12">
              Add Video Description
              <span className="ml-1 text-red-500"> *</span>
              <textarea
                name="videoDescription"
                placeholder="Write the Video Description"
                value={formik.values.videoDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full min-h-[5rem] max-h-full overflow-y-scroll p-2 text-sm col-span-12 mt-2 overflow-hidden border-2 border-gray-300 focus:border-primary"
              />
            </div>
            {formik.touched.videoDescription &&
              formik.errors.videoDescription && (
                <div className="text-red-500 text-sm">
                  {formik.errors.videoDescription as string}
                </div>
              )}
            <div className="text-lg text-gray-600  col-span-12">
              Add Video URL{" "}
              <span className="text-gray-600"> (Use embed video URL)</span>
              <span className="ml-1 text-red-500"> *</span>
              <input
                name="videoUrl"
                placeholder="Write the video title"
                value={formik.values.videoUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 text-sm col-span-12 mt-2 overflow-hidden border-2 border-gray-300 focus:border-primary"
              />
            </div>
            {formik.touched.videoUrl && formik.errors.videoUrl && (
              <div className="text-red-500 text-sm">
                {formik.errors.videoUrl as string}
              </div>
            )}
            <div className="w-full flex items-center justify-center mt-6">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`bg-primary/90 px-8 py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : "opacity-100"
                }`}
              >
                {isEdit ? "Update" : "Add VIdeo"}
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
export default AddVideoForm;
