import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import dummyProfile from "/images/man.png";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
function StudEditProfile() {
  const { userInfo, token, role } = useAuth();

  const [userImageJpg, imageExisting] = useOutletContext();

  const [file, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const ProfilePictureHandler = () => {
    if (imageExisting === true) {
      return (
        <div>
          {file ? (
            <img src={preview} alt={userInfo.first_name} />
          ) : (
            <img src={userImageJpg} alt={userInfo.first_name} />
          )}
        </div>
      );
    } else {
      return (
        <div>
          {file ? (
            <img src={preview} alt={userInfo.first_name} />
          ) : (
            <img src={dummyProfile} alt={userInfo.first_name} />
          )}
        </div>
      );
    }
  };

  const SubmitProfileHandler = async (e) => {
    e.preventDefault();
    let toastId;
    try {
      if (!file) {
        toast.error("Nothing to update");
      } else if (file.size > 5242880) {
        toast.error("The file must not be exceeded to 25 MB");
      } else if (file.type !== "image/jpg" && file.type !== "image/jpeg") {
        toast.error("Image must be in JPG format");
      } else {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);

        console.log(formData);

        toastId = toast.info("Sending Request...");

        const response = await axios
          .post(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/users/uploadprofilepicture`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              toast.update(toastId, {
                render: "Update Successfully",
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
              });
            } else {
              throw new Error(response.status || "Something Went Wrong!");
            }
          });
      }
    } catch (error) {
      toast.update(toastId, {
        render: `${error.message}`,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <label>
                        <div>{ProfilePictureHandler()}</div>
                        <input type="file" onChange={onSelectFile} />
                      </label>
                    </div>
                    <h5 className="user-name">
                      {userInfo.first_name} {userInfo.last_name}
                    </h5>
                    <h6 className="user-email">{userInfo.email}</h6>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                    <p>
                      {userInfo.first_name} {userInfo.last_name}, {role} of
                      Bestlink College of the Philippines
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <form onSubmit={SubmitProfileHandler} className="card-body">
                <div className="row gutters mb-0">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-2">
                      <div className="mb-2">Full Name</div>
                      <input
                        type="text"
                        disabled={true}
                        value={`${userInfo.first_name} ${userInfo.last_name}`}
                        className="form-control"
                        id="eMail"
                        placeholder="Enter email ID"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-2">
                      <div className="mb-2" htmlFor="eMail">
                        Email
                      </div>
                      <input
                        type="email"
                        disabled={true}
                        value={userInfo.email && userInfo.email}
                        className="form-control"
                        id="eMail"
                        placeholder="Enter email ID"
                      />
                    </div>
                  </div>
                </div>

                <div className="row gutters">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="mb-2">Program</div>
                      <input
                        type="text"
                        disabled={true}
                        value={`${userInfo.program}`}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="form-group">
                      <div className="mb-2">Department</div>
                      <input
                        type="text"
                        disabled={true}
                        value={userInfo.department}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <Link
                    to="/student/changepassword"
                    className="text-decoration-none"
                  >
                    Change Password?
                  </Link>
                </div>

                <div className="row gutters mt-4 ">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-flex justify-content-end">
                      <button className=" smallButtonTemplate text-right sumbit-button btn px-5">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudEditProfile;
