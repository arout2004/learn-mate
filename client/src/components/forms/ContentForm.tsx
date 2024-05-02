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
const ContentForm = ({ open, isEdit, handleClose, data, mutate }: any) => {
  const router = useRouter();
  const { mutation } = useMutation();
  const initialValues = {
    contentTitle: "",
    contentDescription: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEdit
      ? {
          contentTitle: data?.contentTitle,
          contentDescription: data?.contentDescription,
        }
      : initialValues,
    validationSchema: yup.object({
      contentTitle: yup
        .string()
        .required("content title is required")
        .min(3, "content title must be at least 3 characters"),
      contentDescription: yup
        .string()
        .required("content description is required")
        .min(20, "content description must be at least 20 characters"),
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
          res = await mutation(`api/content/${data?._id}`, {
            method: "PUT",
            body: {
              contentTitle: values?.contentTitle,
              contentDescription: values?.contentDescription,
            },
            isAlert: true,
          });
          mutate?.();
          handleClose();
        }
        if (!isEdit) {
          res = await mutation(`api/content/${router?.query?.lectureId}`, {
            method: "POST",
            body: {
              contentTitle: values?.contentTitle,
              contentDescription: values?.contentDescription,
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
          {isEdit ? "Update Content" : "Add Content"}
        </p>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-lg text-gray-600  col-span-12">
              Write Title
              <span className="ml-1 text-red-500"> *</span>
              <input
                name="contentTitle"
                placeholder="Write the title"
                value={formik.values.contentTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 text-sm col-span-12 mt-2 overflow-hidden border-2 border-gray-300 focus:border-primary"
              />
            </div>
            {formik.touched.contentTitle && formik.errors.contentTitle && (
              <div className="text-red-500 text-sm">
                {formik.errors.contentTitle as string}
              </div>
            )}
            <div className="text-lg text-gray-600  col-span-12">
              Write Content
              <span className="ml-1 text-red-500"> *</span>
              <textarea
                name="contentDescription"
                placeholder="Write the content"
                value={formik.values.contentDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full min-h-[10rem] max-h-full overflow-y-scroll p-2 text-sm col-span-12 mt-2 overflow-hidden border-2 border-gray-300 focus:border-primary"
              />
            </div>
            {formik.touched.contentDescription &&
              formik.errors.contentDescription && (
                <div className="text-red-500 text-sm">
                  {formik.errors.contentDescription as string}
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
                {isEdit ? "Update" : "Add Content"}
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
export default ContentForm;
