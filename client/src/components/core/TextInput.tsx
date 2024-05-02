import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent, FocusEvent } from "react";
import { useRef, useEffect } from "react";
import PhotoUpload from "./PhotoUpload";
type Props = {
  type: "text" | "select" | "date" | "file" | "number" | "email" | "month";
  value?: any;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  options?: any;
  title?: string;
  id?: string;
  image?: string;
  variant?: "filled" | "outlined" | "standard";
  InputProps?: any;
  inputProps?: any;
  styleContact?: any;
  styleArea?: any;
  styleField?: any;
  onFileChange?: any;
  multiline?: boolean;
  rows?: number;
  size?: "small" | "medium";
};

const TextInput = ({
  type,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  fullWidth,
  placeholder,
  name,
  disabled,
  InputProps,
  title,
  id,
  variant,
  inputProps,
  options,
  styleContact,
  image,
  styleArea,
  styleField,
  onFileChange,
  rows,
  multiline,
  size,
}: Props) => {
  const quantityInputRef = useRef<any>(null);
  useEffect(() => {
    const ignoreScroll = (e: any) => {
      e.preventDefault();
    };
    quantityInputRef?.current &&
      quantityInputRef?.current?.addEventListener("wheel", ignoreScroll);
  }, [quantityInputRef]);
  switch (type) {
    case "text":
      return (
        <div className={styleArea}>
          <p className="text-theme text-wider font-medium pb-2">{title}</p>
          <TextField
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            id={id}
            variant={variant}
            className={styleContact}
            disabled={disabled}
            InputProps={InputProps}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            size={size}
          />
        </div>
      );
    case "number":
      return (
        <div className={styleArea}>
          <p className="text-theme text-wider font-medium pb-2">{title}</p>
          <TextField
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            id={id}
            type="number"
            ref={quantityInputRef}
            variant={variant}
            className={styleContact}
            InputProps={InputProps}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            size={size}
          />
        </div>
      );
    case "date":
      return (
        <div className={styleArea}>
          <p className="text-theme text-wider font-medium pb-2">{title}</p>
          <TextField
            fullWidth={fullWidth}
            type="date"
            name={name}
            id={id}
            variant={variant}
            className="rounded-lg"
            inputProps={inputProps}
            InputProps={InputProps}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            size={size}
          />
        </div>
      );
    case "file":
      return (
        <div className={styleField}>
          <p className="text-theme text-wider font-medium pb-2">{title}</p>
          <div className={styleField}>
            <PhotoUpload value={image} onChange={onFileChange} />
          </div>
        </div>
      );

    case "select":
      return (
        <div className={styleArea}>
          <p className="text-theme text-wider font-medium pb-2">{title}</p>
          <TextField
            fullWidth={fullWidth}
            id={id}
            select={true}
            name={name}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            className={styleContact}
            InputProps={InputProps}
            error={error}
            helperText={helperText}
            size={size}
          >
            {options?.map((option: any) => (
              <MenuItem
                key={option?.value || option?.state || option?.phone}
                value={option?.value || option?.state || option?.phone}
                selected={option?.selected}
              >
                {option?.label || option?.state}
              </MenuItem>
            ))}
          </TextField>
        </div>
      );

    default:
      return (
        <div className={styleArea}>
          <p className="text-theme text-wider font-medium pb-2">{title}</p>
          <TextField
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            type={type}
            id={id}
            variant={variant}
            className={styleContact}
            InputProps={InputProps}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            size={size}
          />
        </div>
      );
  }
};

export default TextInput;
