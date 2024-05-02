import { Close, Description } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { useState } from "react";

const DocumentRead = ({
  data,
  isPurchased,
}: {
  data: any;
  isPurchased: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex flex-row gap-3 justify-between  p-2">
        <p className="flex items-center gap-2 text-sm" key={data._id}>
          <Description
            className="!text-base !text-red-500 !cursor-pointer"
            onClick={handleOpen}
          />
          <span
            className="text-blue-500 hover:text-blue-600 cursor-pointer underline capitalize"
            onClick={handleOpen}
          >
            {data?.contentTitle}
          </span>
        </p>
      </div>
      <Dialog
        open={isOpen}
        keepMounted={false}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <section className="relative p-5">
          <span className="absolute top-6 right-3">
            <IconButton onClick={handleClose}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <div className="flex flex-col gap-1 pt-4">
            <p className="text-2xl capitalize font-semibold text-primary">
              {data?.contentTitle}
            </p>
          </div>
          <div className="py-7">
            {isPurchased ? (
              <p>{data?.contentDescription}</p>
            ) : (
              <p className="text-red-500 text-xl font-semibold bg-yellow-100 p-2 rounded-md text-center">
                {
                  "You need to purchase this course to access the study material"
                }
              </p>
            )}
          </div>
        </section>
      </Dialog>
    </div>
  );
};

export default DocumentRead;
