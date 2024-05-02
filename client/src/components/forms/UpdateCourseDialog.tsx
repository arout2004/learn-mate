import { useCategories } from "@/hooks/useCategory";
import useMutation from "@/hooks/useMutation";
import useSWRAPI from "@/hooks/useSWRAPI";
import { Add, Close, EditOutlined } from "@mui/icons-material";
import {
  CircularProgress,
  DialogTitle,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { FileUpload, TextInput } from "../core";

export default function UpdateCourseDialog({ course, mutate }: any) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [courseCategoryId, setCourseCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const { allCategories } = useCategories();
  const { mutation, isLoading } = useMutation();

  const { data } = useSWRAPI("api/categories/");
  const courseCategoryData = data?.data?.categories;

  const inputSchema = [
    {
      key: "1",
      name: "name",
      label: "Course Name",
      required: true,
      placeholder: "Enter course name",
      initialValue: "",
      validationSchema: yup
        .string()
        .required("Course name is required")
        .min(3, "Minimum 3 characters")
        .max(100, "Maximum 100 characters"),
      type: "text",
      className: "col-span-12",
    },
    {
      key: "2",
      name: "description",
      label: "Description",
      required: true,
      placeholder: "Enter course description",
      initialValue: "",
      validationSchema: yup
        .string()
        .required("Description is required")
        .min(10, "Minimum 10 characters")
        .max(100, "Maximum 100 characters"),
      type: "text",
      multiline: true,
      rows: 2,
      className: "col-span-12",
    },
    {
      key: "3",
      name: "category",
      label: "Category",
      required: true,
      initialValue: course?.courseCategoryId,
      validationSchema: yup.string().required("Category is required"),
      type: "select",
      options:
        courseCategoryData === null
          ? []
          : courseCategoryData?.map((item: any) => ({
              key: item?._id, // Adjust this according to your API response
              label: item?.name, // Adjust this according to your API response
              value: item?._id,
              // value: item?.name + "@" + item?._id,
            })),
      className: "col-span-6",
    },
    {
      key: "5",
      name: "mrp",
      label: "MRP Price",
      required: true,
      placeholder: "Enter MRP price",
      initialValue: "",
      validationSchema: yup
        .string()
        .required("MRP price is required")
        .min(1, "Minimum 1 digit")
        .test(
          "non-negative",
          "Value must be positive",
          (value) => parseFloat(value) >= 0
        ),
      type: "number",
      className: "col-span-6",
    },
    {
      key: "6",
      name: "salePrice",
      label: "Sale Price",
      required: true,
      placeholder: "Enter sale price",
      initialValue: "",
      validationSchema: yup
        .string()
        .required("Sale price is required")
        .min(1, "Minimum 1 digit")
        .test(
          "non-negative",
          "Value must be positive",
          (value) => parseFloat(value) >= 0
        )
        .test(
          "less-than-or-equal-to-cost-price",
          "Sale price must be less than or equal to MRP price",
          function (value) {
            const mrpPrice = this.parent.mrp;
            return parseFloat(value) <= parseFloat(mrpPrice);
          }
        ),
      type: "number",
      className: "col-span-6",
    },
  ];

  const initialValues: any | null = course
    ? {
        name: course?.name || "",
        description: course?.description || "",
        category: course?.category || "",
        mrp: course?.mrp || "",
        salePrice: course?.salePrice || "",
        thumbnail: course?.thumbnail,
      }
    : null;

  const validationSchema = yup.object(
    Object.fromEntries(
      inputSchema?.map((item) => [item.name, item.validationSchema])
    )
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let res;
      const updateCourse = {
        id: course?._id,
        name: values.name,
        description: values.description,
        // category: values.category,
        // courseCategoryName: category?.categoryName || "",
        mrp: values.mrp,
        salePrice: values.salePrice,
        thumbnail: image,
      };
      try {
        setLoading(true);
        res = await mutation(`api/courses/${course?._id}`, {
          method: "PUT",
          body: updateCourse,
          // isFormData: true,
          isAlert: true,
        });
        mutate();
        setImage(null);
        formik.resetForm();
        setLoading(false);
        handleClose();
      } catch (error) {
        console.error("Error updating course:", error);
        setLoading(false);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">Update Course</h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-y-auto">
            <form className="grid grid-cols-12 gap-6">
              {inputSchema?.map((items) => (
                <div
                  className={`text-xl font-medium text-primary ${items?.className}`}
                  key={items.key}
                >
                  {items?.label}
                  {items?.required ? (
                    <span className="ml-1 text-red-500">*</span>
                  ) : null}
                  <TextInput
                    key={items?.key}
                    name={items?.name}
                    placeholder={items?.placeholder}
                    type={items?.type as any}
                    value={formik?.values[items?.name]}
                    onChange={(e) => {
                      if (items?.name == "courseCategory")
                        setCourseCategoryId(e?.target?.value);
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    options={items?.options?.map((option: any) => ({
                      ...option,
                      selected: option.value === formik?.values[items?.name],
                    }))}
                    size="small"
                    multiline={items?.multiline}
                    rows={items?.rows}
                    fullWidth
                    error={Boolean(
                      formik?.touched[items?.name] &&
                        formik?.errors[items?.name]
                    )}
                    helperText={
                      formik?.touched[items?.name] &&
                      (formik?.errors[items?.name] as any)
                    }
                    styleArea={`${"col-span-12 md:col-span-6 !w-full"}`}
                    styleField="w-full col-span-12 overflow-hidden"
                  />
                </div>
              ))}
              {/* <div className="col-span-12 md:col-span-6 !w-full">
                <p className="text-theme text-wider font-medium pb-2">
                  Select Category
                </p>
                <TextField
                  fullWidth
                  id="courseCategory"
                  select
                  name="courseCategory"
                  value={formik?.values?.courseCategory || ""}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className=""
                  error={Boolean(
                    formik?.touched.courseCategory &&
                      formik?.errors?.courseCategory
                  )}
                  helperText={
                    formik?.touched?.courseCategory &&
                    (formik?.errors?.courseCategory as any)
                  }
                  // Set defaultValue for the "courseCategory" field
                  defaultValue={allCategories?.find(
                    (option: any) =>
                      option.id === course?.courseCategoryId || ""
                  )}
                >
                  {allCategories?.map((option: any) => (
                    <MenuItem key={option?.id} value={option?.id}>
                      {option?.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </div> */}
              <div className="col-span-12">
                <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                  Thumbnail
                  <span className="text-red-500">*</span>
                </label>
                <FileUpload
                  allowedTypes=".jpg, .jpeg, .png, .gif, .webp"
                  variant={"square"}
                  value={image}
                  onChange={(imageUrl: string) => {
                    setImage(imageUrl);
                  }}
                  width="100%"
                  height={175}
                  className="bg-primary/30"
                />
              </div>
            </form>
            <div className="w-full flex items-center justify-center mt-6">
              <button
                type="submit"
                onClick={() => formik.handleSubmit()}
                className={`bg-primary/90 md:w-[30%] w-full py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : "opacity-100"
                }`}
                disabled={formik.isSubmitting}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      color="inherit"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                    Updating
                  </>
                ) : (
                  "Update Course"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>

      <Tooltip title="updateCourse" followCursor placement="top-start" arrow>
        <button
          onClick={handleClickOpen}
          className="w-8 h-8 grid place-items-center rounded-full border border-amber-500 bg-amber-500/10 text-amber-500"
        >
          <EditOutlined fontSize="small" />
        </button>
      </Tooltip>
    </>
  );
}
