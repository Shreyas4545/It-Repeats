import React, { useRef } from "react";
import trash from "../../assets/images/trash.png";
import download from "../../assets/images/import.png";
import upload from "../../assets/images/export.png";
import { Select, Modal } from "antd";
import axios from "axios";
import Departments from "./Departments";
import cs from "./Courses";
import { useState, useEffect } from "react";
import { ROUTES } from "../../routes/RouterConfig";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import "./dashboard.css";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const fileref = useRef(null);
  const [loading, setLoading] = useState(false);
  const userid = localStorage.getItem("uid");
  let noty = localStorage.getItem("noty");
  useEffect(() => {
    if (!noty) {
      openNotificationWithIcon("success");
    }
    noty = true;
    localStorage.setItem("noty", true);
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Login",
      description: "You are Successfully Logged in",
    });
  };

  const [depts, setDepts] = useState([]);
  const [qp, setQP] = useState([]);
  const [progress, setProgress] = useState();
  const [details, setDetails] = useState({
    depart: "",
    sem: "",
    year: "",
    exam: "",
    course: "",
  });

  const clear = () => {
    setDetails({
      depart: "",
      sem: "",
      year: "",
      exam: "",
      course: "",
    });
    setFile(null);
    fileref.current.value = null;
  };

  {
    /* Modal */
  }
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Successfully Uploaded Question Paper"
  );
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [file, setFile] = useState();
  const handlechange = (e) => {
    let file = e.target.files[0];
    setFile(file);
  };

  const uploadQP = async () => {
    const formdata = new FormData();
    setLoading(true);
    formdata.append("image", file);
    formdata.append("departmentName", details.depart);
    formdata.append("semester", details.sem);
    formdata.append("subjectName", details.course);
    formdata.append("year", details.year);
    formdata.append("examName", details.exam);
    formdata.append("uid", userid);
    console.log(formdata.get("departmentName"));
    const config = {
      method: "post",
      url: "http://localhost:9000/api/question-paper/save-details",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setOpen(true);
        clear();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    getData();
  };

  const getData = async () => {
    setLoading(true);

    await axios
      .get("http://localhost:9000/api/question-paper/get-details")
      .then((res) => {
        // console.log(res.data.data);
        setQP(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const downloadQP = () => {};
  const deleteQP = async (e) => {
    let qid = e;
    await axios
      .delete(`http://localhost:9000/api/question-paper/delete/${qid}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get("http://localhost:9000/api/question-paper/get-details")
      .then((res) => {
        // console.log(res.data.data);
        setQP(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const semesterarray = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    },
    {
      label: "7",
      value: "7",
    },
    {
      label: "8",
      value: "8",
    },
  ];

  function info(name, value) {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const logout = () => {
    localStorage.removeItem("noty");
    localStorage.removeItem("uid");
    navigate(ROUTES.Home);
  };

  let departments = [];

  const getSubject = async () => {
    await axios
      .get("https://itrepeats-backend.vercel.app/api/question-paper/get-depart")
      .then((res) => {
        setDepts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    try {
      depts &&
        depts?.map((item) => {
          const newItem = {
            label: item.departmentName,
            value: item.departmentCode,
          };
          departments.push(newItem);
        });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(departments.length);

  const getsemester = async () => {
    await axios
      .get("")
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    // getSubject();
    if (details.depart && details.sem) {
      getSubject();
    }
  }, [details.depart, details.sem]);

  return (
    <div>
      {contextHolder}
      {loading ? <Loader /> : null}
      <div
        className={
          loading
            ? "bg-[#eeeeee] opacity-25 h-[100vh] overflow-hidden"
            : "bg-[#eeeeee] h-[100vh] overflow-hidden"
        }
      >
        <div
          className="w-[100%] h-[12px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(49, 83, 67, 0.44) 0%, #315343 100%)",
          }}
        ></div>

        <div className="flex h-[100%] overflow-hidden">
          <div
            className="grow-[0.2] w-[28rem] flex flex-col  pl-[3.8rem] py-[2.80rem] border-r pr-12"
            style={{ borderColor: "rgba(49, 83, 67, 0.2)" }}
          >
            <h2
              className="text-4xl text-[#222222]   tracking-wider"
              style={{ fontFamily: "Bebas Neue" }}
            >
              IT REPEATS
            </h2>
            <h2
              className="text-xl pt-2 text-[#999999]"
              style={{ fontFamily: "proxima-nova" }}
            >
              Dashboard.
            </h2>
            <h2
              className="text-xl text-[#000000] tracking-wider font-bold  mt-[3.5rem]"
              style={{ fontFamily: "proxima-nova" }}
            >
              Your uploads.
            </h2>
            {qp &&
              qp?.map((item, key) => {
                let a = item?.data.uid;
                let b = item?.id;
                return a === userid ? (
                  <div>
                    <div className="scrollbar mt-2 scroll-smooth overflow-y-scroll max-h-[476px]">
                      <div
                        className="p-[2rem] rounded mt-[1rem] h-20 flex justify-between items-center py-[0.75rem]"
                        style={{ background: "rgba(49, 83, 67, 0.6)" }}
                      >
                        <div>
                          <div className=" text-lg font-semibold text-[white]">
                            {item?.data.departmentName}
                          </div>
                          <div className="text-[white]">
                            <span className="font-semibold uppercase">cse</span>
                            <span>. {item?.data.semester}</span>{" "}
                            <span>. {item?.data.year}</span>
                          </div>
                        </div>
                        <div className="flex gap-[1.2rem] ">
                          <a href={item?.data.fileUrl} target="_blank">
                            <img
                              src={download}
                              onClick={() => downloadQP()}
                              className="w-[1.4rem] h-[1.4rem] cursor-pointer"
                              alt=""
                            />
                          </a>
                          <img
                            src={trash}
                            onClick={() => deleteQP(b)}
                            className="w-[1.4rem] h-[1.4rem] cursor-pointer"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
          </div>
          <div className="grow-[0.8] px-[4.8rem] pt-[5.00rem]">
            <div className="flex justify-end">
              <button
                onClick={() => logout()}
                className={
                  "bg-[#222222] w-[160px] text-lg h-[46px] rounded-[4px] text-[white] hover:bg-[#999999] hover:text-[black]"
                }
                style={{ fontFamily: "proxima-nova" }}
              >
                Log Out
              </button>
            </div>
            <h2
              className="text-xl tracking-wider text-[#000000] font-bold  mt-[3.5rem]"
              style={{ fontFamily: "proxima-nova" }}
            >
              New upload.
            </h2>
            <div
              className="mt-[1.6rem] flex flex-col justify-center items-center  h-[350px] rounded"
              style={{ background: "rgba(49, 83, 67, 0.1)" }}
            >
              <img src={upload} className="w-[32px] h-[32px]" alt="" />
              <h2 className="text-lg text-[#000000] tracking-wider font-bold">
                Upload PDF
              </h2>
              <h2
                className="tracking-wider mt-[1rem]"
                style={{
                  fontFamily: "proxima-nova",
                  color: "rgba(34, 34, 34, 0.8)",
                }}
              >
                Max Size Limit is 10 MB
              </h2>
              <div>
                <input
                  id="choose-file"
                  className="text-lg text-[#000000] tracking-wider l-[8rem] ml-[8rem] mt-[1rem] font-bold"
                  onChange={handlechange}
                  type="file"
                  ref={fileref}
                />
              </div>
            </div>

            {/* dropdown buttons */}

            <div className="columns-5 flex w-[0px] mt-2">
              <div className="">
                <Select
                  name="depart"
                  value={details.depart || "Select Department"}
                  defaultValue="Select Department"
                  style={{
                    width: 215.8,
                  }}
                  className=""
                  onChange={(value) => info("depart", value)}
                  options={departments}
                />
              </div>
              <div className="">
                <Select
                  name="sem"
                  value={details.sem || "Select Semester"}
                  defaultValue="Select Semester"
                  style={{
                    width: 215.8,
                  }}
                  onChange={(value) => info("sem", value)}
                  className="ml-5"
                  options={semesterarray}
                />
              </div>
              <div>
                <Select
                  name="course"
                  className="ml-5"
                  value={details.course || "Select Course"}
                  defaultValue="Select Course"
                  style={{
                    width: 215.8,
                  }}
                  onChange={(value) => info("course", value)}
                  options={cs[details.sem - 1]}
                />
              </div>
              <div>
                <Select
                  className="ml-5"
                  name="year"
                  value={details.year || "Select Year"}
                  defaultValue="Select Year"
                  style={{
                    width: 215.8,
                  }}
                  onChange={(value) => info("year", value)}
                  options={[
                    {
                      label: "2018",
                      value: "2018",
                    },
                    {
                      label: "2019",
                      value: "2019",
                    },
                    {
                      label: "2020",
                      value: "2020",
                    },
                    {
                      label: "2021",
                      value: "2021",
                    },
                    {
                      label: "2022",
                      value: "2022",
                    },
                    {
                      label: "2023",
                      value: "2023",
                    },
                  ]}
                />
              </div>

              <div>
                <Select
                  defaultValue="Select Exam"
                  value={details.exam || "Select Exam"}
                  className="ml-5"
                  name="exam"
                  style={{
                    width: 215.8,
                  }}
                  onChange={(value) => info("exam", value)}
                  options={[
                    {
                      label: "ISA 1",
                      value: "ISA 1",
                    },
                    {
                      label: "ISA 2",
                      value: "ISA 2",
                    },
                    {
                      label: "ESA",
                      value: "ESA",
                    },
                  ]}
                />
              </div>
            </div>

            {/* ends here  */}

            <div className="text-center pt-[52px] ">
              <button
                onClick={() => uploadQP()}
                className={
                  "bg-[#222222] p-2 px-3 w-[160px] text-lg h-[46px] rounded-[4px] text-[white] hover:bg-[#999999] hover:text-[black]"
                }
                style={{ fontFamily: "proxima-nova" }}
              >
                Upload
              </button>
              <br></br>
              <br></br>
              {departments &&
                departments?.map((item) => {
                  return (
                    <div>
                      {item?.label}
                      {item?.value}
                    </div>
                  );
                })}
              {progress === 100 ? (
                <Modal
                  title="Success ✅"
                  className="mt-[15rem] text-4xl"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  {modalText}
                </Modal>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
