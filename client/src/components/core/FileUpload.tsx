import { CloudUpload } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRef } from "react";

type Props = {
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any;
  variant?: "square" | "rounded" | "circular";
  height?: any;
  width?: any;
  dimensions?: number;
  className?: string;
  txtName?: string;
  allowedTypes?: string;
};

const FileUpload = ({
  value,
  onChange,
  variant,
  height,
  width,
  dimensions,
  className,
  txtName,
  allowedTypes,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to convert image to Base64 data URL
  const convertImageToDataURL = (file: any) => {
    console.log("convert image runinng.....", file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: any) => {
    try {
      const file = e?.target?.files?.[0];
      if (!file) return;

      // Convert the image file to Base64 data URL
      const imageUrl = await convertImageToDataURL(file);

      // Call the onChange function with the Base64 data URL
      onChange(imageUrl);

      if (!dimensions) return;
    } catch (error) {
      console.error("Error handling image change:", error);
    }
  };

  return (
    <>
      <Avatar
        variant={variant || "square"}
        className={className}
        sx={{
          height: height || 120,
          width: width || "100%",
          cursor: "pointer",
          borderRadius: "0.375rem",
          backgroundColor: "#e5e7eb",
          objectFit: "contain",
          backgroundImage: `url("${typeof value === "string" ? value : ""}")`,
        }}
        onClick={() => inputRef.current?.click()}
      >
        {!value && (
          <div className="h-full w-full flex flex-col gap-4 items-center justify-center border border-primary border-dashed rounded-md">
            <CloudUpload className="text-5xl" />
            <small className="text-gray-400 tracking-wider">{txtName}</small>
          </div>
        )}
      </Avatar>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={handleImageChange}
        accept={
          allowedTypes
            ? allowedTypes
            : "image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .mp4"
        }
      />
    </>
  );
};

export default FileUpload;
