import React, { useEffect, useState } from "react";
import background from "../../assets/background.png";
import signup from "../../assets/signup.png";
import welcome from "../../assets/welcomeback.PNG"
import logo from "../../assets/tickitz 1.png"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Show } from "../../helpers/toast";
import { login } from "../../store/reducer/user"

function Signin() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { isAuth } = useSelector((s) => s.users)
  const dispatch = useDispatch()


  const inputChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };


  const validateForm = () => {
    const newErrors = {};
    if (!form.email_user || !form.email_user.includes("@")) {
      newErrors.email_user = "Please enter a valid email address";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Login = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8081/auth/login", form);
        const data = response.data; // Dapatkan data dari respons
        console.log("Login Berhasil", data);
        Show("Login Success", "success");
        console.log(data)
        const token = data.data;
        dispatch(login(token));
        setTimeout(() => {
          navigate("/");
        }, 3000);

      } catch (error) {
        console.error(error.message);
      }
    } else {
      Show("wrong password", "error")
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="h-screen">
          <img
            className="absolute inset-0 h-full w-full object-cover brightness-50"
            src={background}
            alt="Background"
          />
        </div>
        <div className="absolute flex flex-col justify-center items-center my-40">
          <img className="w-60 object-cover rounded-full mb-10" src={logo} />
          <div className="flex flex-col gap-y-5 bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col gap-y-5">
              <img className="w-60 object-cover rounded-full" src={welcome} />
              <p className="text-[#A0A3BD] text-xl tracking-tight">Sign in with your data that you entered during<br />your registration</p>
              <form onSubmit={Login} className="flex flex-col gap-y-5">
                <div>
                  <p>Email</p>
                  <input
                    type="text"
                    name="email_user"
                    placeholder="enter your email"
                    className="border-2 w-full px-3 py-3 rounded-md mt-2"
                    onChange={inputChange}
                  />
                  {errors.email_user && (
                    <p className="text-red-500">{errors.email_user}</p>
                  )}
                </div>
                <div>
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    className="border-2 w-full px-3 py-3 rounded-md mt-2"
                    onChange={inputChange}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>
                <Link to="/" className="text-right text-blue-500 font-semibold">
                  Forgot Your Password?{" "}
                </Link>
                <button type="submit"
                  className="px-2 py-3 cursor-pointer bg-blue-500 block text-white text-center rounded-md mt-2"
                >
                  Login
                </button>
              </form>
              <h1 className="border-b leading-[0.1rem] border-[#DEDEDE] text-center my-5">
                <span className="bg-white text-center"><Link className="p-5 text-[#AAAAAA] font-semibold text-md">or</Link></span>
              </h1>
              <img src={signup} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
