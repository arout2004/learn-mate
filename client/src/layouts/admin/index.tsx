import Head from "next/head";
import AdminNavbar from "./AdminNavbar";
import Drawer from "./Drawer";
type Props = {
  title?: string;
  children: JSX.Element[] | JSX.Element;
  description?: string;
  ogImage?: string;
};
const AdminPanelLayout = ({
  title = "Welcome To Your Panel",
  children = <></>,
  description,
  ogImage,
}: Props) => {
  return (
    <>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={ogImage} />
      </Head>
      <main
        className="relative max-w-[1920px] w-full flex items-start justify-between gap-5 mx-auto p-5"
        style={{
          background: "linear-gradient(to right, #f9f9f9, #eafaea, #e4f2fe)",
        }}
      >
        <Drawer />

        <section className="w-full">
          <AdminNavbar />
          <article className="h-[calc(100vh-124px)] overflow-y-scroll">
            {children}
          </article>
        </section>
      </main>
    </>
  );
};

export default AdminPanelLayout;
