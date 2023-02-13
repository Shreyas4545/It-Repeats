import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../../routes/RouterConfig";
import "./Home.css";
import { notification} from 'antd';
import PacmanLoader from "react-spinners/PacmanLoader"

const Home = () => {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type,message,desc) => {
    api[type]({
      message: `${message}`,
      description:
        `${desc}`,
    });
  };


  const set = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const login = () => {

    if(!user.email && !user.password)
    {
      openNotificationWithIcon('error','Login Failed','Please enter the required details');
    }
    else{
    axios
      .post("http://localhost:9000/api/user/login", user)
      .then((res) => {
        console.log(res.data);
        navigate(ROUTES.Dashboard);
        localStorage.setItem('uid',res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        openNotificationWithIcon('error','Login Failed','Invalid Credentials');
      });
    }
  };

  return (
    <div className="flex flex-col bg-[#eeeeee] h-[100vh]  overflow-hidden">
    {contextHolder}
      <div
        className="w-[100%] h-[12px] "
        style={{
          background:
            "linear-gradient(90deg, rgba(49, 83, 67, 0.44) 0%, #315343 100%)",
        }}
      ></div>
      <div className="Home flex flex-col px-[1.5rem] pb-[1.5rem] grow items-center  justify-center">
        <div className="text-center">
          <h2
            className="text-4xl text-[#222222]   tracking-wider"
            style={{ fontFamily: "Bebas Neue" }}
          >
            IT REPEATS
          </h2>
          <h2
            className="text-4xl text-[#999999]"
            style={{ fontFamily: "proxima-nova" }}
          >
            Central Management System
          </h2>
        </div>

        <div className="input-box flex flex-col gap-2">
          <input
            type="text"
            onChange={(e) => set(e)}
            name="email"
            className="p-2 text-xl px-3 w-[250px] h-[45px] mt-[24px] rounded-[6px] placeholder:text-[black]"
            style={{ fontFamily: "proxima-nova" }}
            placeholder="username"
            autoComplete="off"
          />
          <input
            type="password"
            onChange={(e) => set(e)}
            name="password"
            className="p-2 text-xl px-3 w-[250px] h-[45px] mt-[8px] rounded-[6px] placeholder:text-[black]"
            style={{ fontFamily: "proxima-nova" }}
            placeholder="password"
            autoComplete="off"
          />
        </div>

        <div className="button pt-[32px]">
            <button
              onClick={() =>login()}
              className={`bg-[#222222] text-lg p-2 px-3 w-[120px] h-[42px] rounded-[4px] text-[white] hover:bg-[#999999] hover:text-[black]`}
              style={{ fontFamily: "proxima-nova" }}
            >
              Login
            </button>
        </div>
      </div>
      <div className="flex justify-between px-[1.5rem] pb-[1.5rem] ">
        <h3 className="text-[#999999]">
          &copy;<span className="font-bold text-[#999999]"> IT REPEATS</span>{" "}
        </h3>
        <div className="flex gap-4">
          <h3 className="font-medium text-[#999999]">request access</h3>
          <h3 onClick={() => {navigate(ROUTES.About)}} className="font-medium cursor-pointer text-[#999999]">about us</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
