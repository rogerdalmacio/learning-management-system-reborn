import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
function TeachDashboardSpecificAnnouncement() {
  const { token, role } = useAuth();

  const [announcement, setAnnouncement] = useState();
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const announceId = pathArray[3];

  useEffect(() => {
    const renderCourse = async () => {
      if (role === "teacher") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/teacher/announcements`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);

            const data = response.data.data.find((item) => {
              return item.id == announceId;
            });
            console.log(data);

            setAnnouncement(data);
          });
      }
    };

    renderCourse();
  }, []);
  console.log(announcement);

  const RenderAnnouncement = () => {
    if (announcement !== undefined && announcement !== null) {
      let formattedParagraph = announcement.body
        .replace(/(?:\r\n|\r|\n)/g, "<br>")
        .trim();
      console.log(announcement);
      const date = new Date(announcement.created_at);

      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };

      const formattedDate = date.toLocaleDateString("en-US", options);
      return (
        <div className="AnnouncementContainer2 d-xxl-flex shadow-lg rounded overflow-hidden mb-5 p-3 p-xxl-0">
          <div className="AnnouncementContent m-xxl-3 overflow-hidden">
            <h1 className="fs-2">{announcement.title}</h1>
            <p className="text-secondary fw-semibold fst-italic">
              Posted on {formattedDate} | Adminstrator
            </p>
            <div className="AnnouncementBodyContainer2">
              <p
                className="AnnouncementBody lh-sm px-3 m-0"
                dangerouslySetInnerHTML={{ __html: formattedParagraph }}
              ></p>
            </div>
          </div>
          {announcement.embed_link == "" ? null : (
            <div className="d-flex pt-4 pt-xxl-0 justify-content-center">
              <img
                className="AnnouncementEmbedLinks rounded"
                src={announcement.embed_link}
                width={400}
                alt=""
              />
            </div>
          )}
        </div>
      );
    } else if (
      announcement !== undefined &&
      announcement !== null &&
      announcement.length == 0
    ) {
      return (
        <h4 className="d-flex justify-content-center w-100 fst-italic text-secondary py-5">
          No Content has been added yet.
        </h4>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <div>
      <ArrowNextAndPrevious>
        <h2 className="mb-0">Announcements</h2>
      </ArrowNextAndPrevious>
      <div className="d-flex flex-wrap">{RenderAnnouncement()}</div>
    </div>
  );
}

export default TeachDashboardSpecificAnnouncement;
