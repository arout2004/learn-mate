import useSWRAPI from "@/hooks/useSWRAPI";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import DocumentRead from "./DocumentRead";
import VideoPlay from "./VideoPlay";

const LectureCollapse = ({
  data,
  isPurchased,
}: {
  data: any;
  isPurchased: any;
}) => {
  const { data: contentData, mutate: contentMutate } = useSWRAPI(
    `api/content/${data?._id}`
  );
  const { data: videoData, mutate: videoMutate } = useSWRAPI(
    `api/videos/${data?._id}`
  );
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="!bg-primary/5"
        >
          <div>
            <h3 className="capitalize font-semibold tracking-wide text-xl">
              {data?.title || "notgiven"}
            </h3>
            <p className="text-sm text-gray-700 mt-1">
              {data?.description || "notgiven"}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <aside className="flex flex-col gap-4">
            {/* video Material  */}
            <div className="flex flex-col gap-3">
              {videoData?.data?.videos?.length === 0 ? (
                "No Videos Material Available."
              ) : (
                <>
                  <h1 className="text-gray-700 font-medium">Video Materials</h1>
                  {videoData?.data?.videos?.map((videoData: any) => (
                    <VideoPlay
                      data={videoData}
                      key={videoData._id}
                      isPurchased={isPurchased}
                    />
                  ))}
                </>
              )}
            </div>

            {/* study material  */}
            <div className="flex flex-col gap-3">
              {contentData?.data?.contents?.length === 0 ? (
                "No Study Material Available."
              ) : (
                <>
                  <h1 className="text-gray-700 font-medium">Study Materials</h1>
                  {contentData?.data?.contents?.map((data: any) => (
                    <DocumentRead
                      data={data}
                      key={data?._id}
                      isPurchased={isPurchased}
                    />
                  ))}
                </>
              )}
            </div>
          </aside>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default LectureCollapse;
