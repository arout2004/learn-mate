import useMutation from "@/hooks/useMutation";
import { useFormik } from "formik";
import * as yup from "yup";

const CategoryForm = ({ isEdit, handleClose, item, mutate }: any) => {
  const { mutation } = useMutation();
  const initialValues = {
    categoryName: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEdit
      ? {
          categoryName: item?.name,
        }
      : initialValues,
    validationSchema: yup.object({
      categoryName: yup
        .string()
        .required("Category name is required")
        .min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;
        console.log("values-->", values);
        formData?.append("name", values?.categoryName);
        if (isEdit) {
          res = await mutation(`api/categories/${item?._id}`, {
            method: "PUT",
            body: { name: values?.categoryName },
            isAlert: true,
          });
          mutate?.();
          handleClose();
        }
        if (!isEdit) {
          res = await mutation("api/categories", {
            method: "POST",
            body: { name: values?.categoryName },
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
    <div className="flex flex-col gap-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="text-lg text-gray-600  col-span-12">
          Category
          <span className="ml-1 text-red-500"> *</span>
          <input
            type="text"
            name="categoryName"
            placeholder="Enter category name"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full col-span-12 mt-6 overflow-hidden border-b-2 border-gray-300 focus:outline-none focus:border-primary"
          />
        </div>

        {formik.touched.categoryName &&
          formik.errors.categoryName &&
          typeof formik.errors.categoryName === "string" && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.categoryName}
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
            {isEdit ? "Update" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
