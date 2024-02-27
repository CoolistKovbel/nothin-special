"use server";

import { User } from "../models/User";
import { dbConnect } from "./db";

export const getUserByEmail = async (email: any) => {
  try {
    await dbConnect();

    const user = await User.findOne({ email });

    return user;
  } catch (error) {
    console.log("error getting a freaking email");
  }
};

export const getUserById = async (id: any) => {
  try {
    await dbConnect();

    const user = await User.findOne({ _id: id });

    return user;
  } catch (error) {
    console.log("error getting a freaking id");
  }
};
