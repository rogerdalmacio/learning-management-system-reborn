import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";

function TeachDashboard() {
  const { token, role } = useAuth();

  const [announcement, setAnnouncement] = useState();

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

            setAnnouncement(response.data.data.sort((a, b) => b.id - a.id));
          });
      }
    };

    renderCourse();
  }, []);
  console.log(announcement);

  const RenderAnnouncement = () => {
    if (announcement !== undefined && announcement !== null) {
      return announcement.map((info, i) => {
        console.log(info);
        let formattedParagraph = info.body
          .replace(/(?:\r\n|\r|\n)/g, "<br>")
          .trim();
        console.log(info);
        const date = new Date(info.created_at);

        const options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };

        const formattedDate = date.toLocaleDateString("en-US", options);
        return (
          <div key={i}>
            <Link
              to={`/teacher/home/${info.id}`}
              className="AnnouncementContainer d-xxl-flex shadow-lg rounded overflow-hidden mb-5 p-3 p-xxl-0 text-decoration-none"
            >
              <div className="AnnouncementContent m-xxl-3 overflow-hidden">
                <h1 className="fs-2 text-dark">{info.title}</h1>
                <p className="text-secondary fw-semibold fst-italic">
                  Posted on {formattedDate} | Adminstrator
                </p>
                <div className="AnnouncementBodyContainer">
                  <p
                    className="AnnouncementBody lh-sm px-3 m-0"
                    dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                  ></p>
                </div>
              </div>
              {info.embed_link == "" ? null : (
                <div className="d-flex pt-4 pt-xxl-0 justify-content-center">
                  <img
                    className="AnnouncementEmbedLinks rounded"
                    src={info.embed_link}
                    width={400}
                    alt=""
                  />
                </div>
              )}
            </Link>
          </div>
        );
      });
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

export default TeachDashboard;