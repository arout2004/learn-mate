import { CloudUpload } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRef } from "react";
type Props = {
  value?: any;
  variant?: "square" | "rounded" | "circular";
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any;
  height?: number;
  width?: number;
  dimensions?: number;
  className?: string;
  txtName?: string;
};
const PhotoUpload = ({
  value,
  onChange,
  variant,
  height,
  width,
  dimensions,
  className,
  txtName = "Upload Image",
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = async (e: any) => {
    try {
      const file = e?.target?.files?.[0];
      if (!file) return;
      if (!dimensions) return onChange(e);
    } catch (error) {}
  };
  return (
    <>
      <Avatar
        variant={variant || "square"}
        src={
          value?.target?.files[0]
            ? URL.createObjectURL(value?.target?.files[0])
            : value
        }
        className={className}
        sx={{
          height: height || 120,
          width: width || 120,
          cursor: "pointer",
          objectFit: "contain",
        }}
        onClick={() => inputRef.current?.click()}
      >
        {!value && (
          <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
            <CloudUpload className="text-5xl" />
            <small className="text-xs">{txtName}</small>
          </div>
        )}
      </Avatar>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
    </>
  );
};

export default PhotoUpload;
