import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";
import { Fragment } from "react";

function ManagerDashboard() {
  const { token, role } = useAuth();

  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    const renderCourse = async () => {
      if (role === "CourseManager") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/coursemanager/announcements`,
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
    if (
      announcement !== undefined &&
      announcement !== null &&
      announcement.length !== 0
    ) {
      return announcement.map((info, i) => {
        console.log(info);
        let formattedParagraph = info.body
          .replace(/(?:\r\n|\r|\n)/g, "<br>")
          .trim();
        console.log(info);
        const date = new Date(info.created_at);
        console.log(`${import.meta.env.VITE_API_BASE_URL}/${info.photo_path}`);
        const options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };

        const formattedDate = date.toLocaleDateString("en-US", options);
        return (
          <Fragment key={i}>
            <Link
              to={`/coursemanager/home/${info.id}`}
              className="AnnouncementContainer d-block d-xxl-flex shadow-lg rounded overflow-hidden mb-5 p-3 p-xxl-0 text-decoration-none"
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
                    src={`${import.meta.env.VITE_API_BASE_URL}/${
                      info.photo_path
                    }`}
                    width={400}
                    alt=""
                  />
                </div>
              )}
              <div className="AnnouncementTags text-light p-1">
                <p className="mb-0">{info.tags}</p>
              </div>
            </Link>
          </Fragment>
        );
      });
    } else if (announcement.length == 0) {
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

export default ManagerDashboard;
