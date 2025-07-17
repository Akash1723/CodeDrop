import { react,useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import React from "react";
import { setUserSession,getCurrentSession } from "../services/sessionService";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    let session=getCurrentSession();
    if(session){
      navigate("/");
    }
  },[])

  const onSubmit = async (data) => {
    setIsLoading(true);
    try{
      let response=await fetch("http://127.0.0.1:8000/api/login",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
      })
      
      if(!response.ok){
        const errorData = await response.json();
        console.log(errorData.detail);
        alert("Error: " + errorData.detail);  
        return;
      }

      const responseData = await response.json();
      alert(responseData.message);
      setUserSession(responseData.user);
      navigate("/");

    }catch(error){
      console.error("Network error:", error);
      alert("Something went wrong.Try again later");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white mt-3 mb-3">
      <div className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-md p-8 mt-12">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
          Login to CodeDrop
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-700 text-white py-2 rounded-lg font-semiboldtransition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-800"
            }`}
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-red-700 hover:underline font-semibold"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
