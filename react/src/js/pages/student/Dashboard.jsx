import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/layouts/Loading";

function Dashboard() {
  const { token, role } = useAuth();

  const [announcement, setAnnouncement] = useState();

  useEffect(() => {
    const renderCourse = async () => {
      if (role === "student") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/student/announcements`,
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
        const date = new Date(info.created_at);

        const options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };

        const formattedDate = date.toLocaleDateString("en-US", options);
        return (
          <div className="AnnouncementContainer d-flex shadow-lg rounded overflow-hidden mb-5">
            <div className="AnnouncementContent m-3 px-3 overflow-hidden">
              <h1 className="fs-2">{info.title}</h1>
              <p className="text-secondary fw-semibold fst-italic">
                Posted on {formattedDate} | Adminstrator
              </p>
              <div className="AnnouncementBodyContainer">
                <p className="AnnouncementBody lh-sm px-3 m-0">{info.body}</p>
              </div>
            </div>
            {info.embed_link == "" ? null : (
              <div>
                <img
                  className="AnnouncementEmbedLinks rounded"
                  src={info.embed_link}
                  width={400}
                  alt=""
                />
              </div>
            )}
          </div>
        );
      });
    } else {
      return <Loading />;
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap">{RenderAnnouncement()}</div>
    </div>
  );
}

export default Dashboard;
