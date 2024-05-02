import { AddVideoForm, ContentForm } from "@/components/forms";
import { useContents } from "@/hooks/useContents";
import useMutation from "@/hooks/useMutation";
import useSWRAPI from "@/hooks/useSWRAPI";
import { AdminLayout } from "@/layouts";
import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const LectureContents = () => {
  const router = useRouter();
  const { allContents, updateContents } = useContents();
  const [openModal, setOpenModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const contentData = allContents?.filter(
    (item) => item?.lectureId === router?.query?.lectureId
  );

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleVideoOpen = () => {
    setOpenVideoModal(true);
  };

  const { data, mutate } = useSWRAPI(`api/content/${router?.query?.lectureId}`);
  const { data: videoData, mutate: videoMutate } = useSWRAPI(
    `api/videos/${router?.query?.lectureId}`
  );

  console.log("videoData---my-->", videoData);

  return (
    <AdminLayout title="Manage Content | Learn-Mate">
      <section className="w-full h-full space-y-10">
        <div className="flex flex-col gap-3"></div>
        <div className="cursor-pointer flex md:justify-end flex-col md:flex-row gap-6 px-2">
          <button
            onClick={handleOpen}
            className="flex justify-between gap-2 px-8 py-3 bg-orange-200 text-gray-900 rounded-md border border-gray-600  active:bg-green-800/50"
          >
            <Add />
            Add study Material
          </button>
          <button
            onClick={handleVideoOpen}
            className="flex justify-between gap-2 px-8 py-3 bg-red-200 text-gray-900 rounded-md border border-gray-600  active:bg-green-800/50"
          >
            <Add />
            Add Video Material
          </button>
        </div>
        <div className="relative cursor-pointer">
          <div className="flex flex-col gap-6">
            {data?.data?.contents?.length === 0 &&
            videoData?.data?.videos?.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="capitalize font-semibold text-xl flex items-center justify-center">
                  No Material Created Yet In This Lecture.
                </p>
              </div>
            ) : (
              <aside className="flex justify-center gap-10">
                <div className="w-1/2">
                  <h1 className="text-2xl text-gray-800 font-semibold my-4">
                    Study Materials
                  </h1>
                  {data?.data?.contents?.map((item: any, index: number) => (
                    <StudyMaterialCard
                      key={index}
                      content={item}
                      handleClose={() => setOpenModal(false)}
                      open={openModal}
                      setOpenModal={setOpenModal}
                      mutate={mutate}
                    />
                  ))}
                </div>
                <div className="w-1/2">
                  <h1 className="text-2xl text-gray-800 font-semibold my-4">
                    Video Materials
                  </h1>
                  {videoData?.data?.videos?.map((item: any, index: number) => (
                    <VideoMaterialCard
                      key={index}
                      video={item}
                      handleClose={() => setOpenModal(false)}
                      open={openModal}
                      setOpenModal={setOpenModal}
                      mutate={videoMutate}
                    />
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
      <ContentForm
        handleClose={() => setOpenModal(false)}
        open={openModal}
        mutate={mutate}
      />
      <AddVideoForm
        handleClose={() => setOpenVideoModal(false)}
        open={openVideoModal}
        mutate={videoMutate}
      />
    </AdminLayout>
  );
};

const StudyMaterialCard = ({ content, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const { mutation } = useMutation();
  const handleDelete = async (ID: any) => {
    try {
      setIsLoading(true);
      Swal.fire({
        title: "Warning",
        text: "Are you sure you want to delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes",
        cancelButtonText: "No cancel",
      }).then(async (result) => {
        if (result?.isConfirmed) {
          const res = await mutation(`api/content/${ID}`, {
            method: "DELETE",
            isAlert: true,
          });
          mutate?.();
          setIsLoading(false);
          toast.success("Content deleted successfully...");
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting category:", error);
    }
  };

  const handleEditOpen = () => {
    setEditContent(true);
  };
  return (
    <>
      <div className="bg-white py-4 px-6 flex items-center gap-4 mt-5 justify-between shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md border-t-4 border-orange-400 cursor-pointer hover:-translate-y-3 duration-300">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-medium">{content?.contentTitle}</h1>
          <p className="text-md font-medium text-gray-600 break-words">
            {content?.contentDescription}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Tooltip
            title="Edit Content"
            followCursor
            placement="top-start"
            arrow
          >
            <button
              className="w-8 h-8 grid place-items-center rounded-full border border-orange-600 bg-orange-500/10 text-orange-500"
              onClick={handleEditOpen}
            >
              <Edit />
            </button>
          </Tooltip>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Tooltip
              title="Delete Content"
              followCursor
              placement="top-start"
              arrow
            >
              <button
                disabled={isLoading}
                onClick={() => handleDelete(content?._id)}
                className="w-8 h-8 grid place-items-center rounded-full border border-red-900 bg-red-700/20 text-red-800"
              >
                <DeleteOutline />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      <ContentForm
        isEdit={true}
        handleClose={() => setEditContent(false)}
        open={editContent}
        data={content}
        mutate={mutate}
      />
    </>
  );
};

const VideoMaterialCard = ({ video, mutate }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const { mutation } = useMutation();
  const handleDelete = async (ID: any) => {
    try {
      setIsLoading(true);
      Swal.fire({
        title: "Warning",
        text: "Are you sure you want to delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes",
        cancelButtonText: "No cancel",
      }).then(async (result) => {
        if (result?.isConfirmed) {
          const res = await mutation(`api/videos/${ID}`, {
            method: "DELETE",
            isAlert: true,
          });
          mutate?.();
          setIsLoading(false);
          toast.success("Video deleted successfully...");
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting category:", error);
    }
  };
  const handleEditOpen = () => {
    setEditVideo(true);
  };
  return (
    <>
      <div className="bg-white py-4 px-6 flex items-center gap-4 mt-5 justify-between shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md border-t-4 border-red-400 cursor-pointer hover:-translate-y-3 duration-300">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium text-gray-900 break-words">
            {video?.videoTitle}
          </p>
          <p className="text-md  text-gray-600 break-words">
            {video?.videoDescription}
          </p>
          <a
            href={video?.videoUrl}
            className="text-md text-blue-600 break-words bg-gray-100 p-2"
          >
            {video?.videoUrl}
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <Tooltip title="Edit video" followCursor placement="top-start" arrow>
            <button
              className="w-8 h-8 grid place-items-center rounded-full border border-red-600 bg-orange-500/10 text-red-500"
              onClick={handleEditOpen}
            >
              <Edit />
            </button>
          </Tooltip>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Tooltip
              title="Delete video"
              followCursor
              placement="top-start"
              arrow
            >
              <button
                disabled={isLoading}
                onClick={() => handleDelete(video?._id)}
                className="w-8 h-8 grid place-items-center rounded-full border border-red-900 bg-red-700/20 text-red-800"
              >
                <DeleteOutline />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      <AddVideoForm
        isEdit={true}
        handleClose={() => setEditVideo(false)}
        open={editVideo}
        data={video}
        mutate={mutate}
      />
    </>
  );
};

export default LectureContents;
