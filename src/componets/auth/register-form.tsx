"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { RegisterUser } from "@/lib/action";

const RegisterForm = () => {
  const router = useRouter();

  const [state, dispatch] = useFormState(RegisterUser, undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      dispatch(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (state?.startsWith("Authentication success")) router.push("/login");
  }, [state, router]);

  return (
    <form className="mb-8 w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-400 text-sm mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full  rounded-md border border-2 p-2  bg-[#111]"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full  rounded-md border border-2 p-2  bg-[#111]"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-400 text-sm mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full  rounded-md border border-2 p-2  bg-[#111]"
        />
      </div>

      {/* Select option for preference */}
      <div className="mb-4">
        <label
          htmlFor="preference"
          className="block text-gray-400 text-sm mb-2"
        >
          Choose your preference:
        </label>
        <select
          id="preference"
          name="preference"
          className="w-full  rounded-md border border-2 p-2  bg-[#111]"
        >
          <option value="frontend">Frontend Development</option>
          <option value="backend">Backend Development</option>
          <option value="blockchain">Blockchain</option>
          <option value="ui">UI Design</option>
          <option value="fullStack">Full Stack</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 float-right"
      >
        Register
      </button>


      {state && (
        <>
          {/* <A className="h-5 w-5 text-red-500" /> */}
          <p className="text-sm text-yellow-500">{state}</p>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
