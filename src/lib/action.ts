"use server";

import { User } from "../models/User";
import { WaitList } from "../models/WaitList";

import { dbConnect } from "./db";

import { hash } from "bcryptjs";
import { CreateBlogSchema, SendContactEmail } from "./schema";
import { writeFile } from "fs/promises";
import { sendMail } from "./mail";

export async function whiteList(formData: FormData) {
  const email = formData.get("email");

  try {
    dbConnect();

    const NewMember = new WaitList({
      email: email,
    });

    await NewMember.save();

    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
}

export async function RegisterUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await dbConnect();

    const { username, password, email, preference } =
      Object.fromEntries(formData);

    const userExust = await User.findOne({ email: email as string });

    if (userExust) {
      console.log("user exists error baby girl");
      return "user exists";
    }

    const hashPassword = await hash(password as string, 10);

    const newUser = new User({
      username,
      password: hashPassword,
      email,
      preference,
    });

    await newUser.save();

    return "Authentication success";
  } catch (error) {
    console.log(error);
    return "error im sorry but this entire form";
  }
}

const hadleImageUpload = async (image: any) => {
  const fileBuffer = await (image as File).arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const path = `${process.cwd()}/public/blogheaders/${
    crypto.randomUUID() + image.name
  }`;

  await writeFile(path, buffer);

  return path.split(`${process.cwd()}/public/`)[1];
};

export async function CreateBlogPost(
  id: string,
  prevState: string | object | undefined,
  formData: FormData
) {
  try {
    // const { title, description, content, image, category } =
    //   Object.fromEntries(formData);

    const data = Object.fromEntries(formData.entries());

    const validatedFields = CreateBlogSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        message: "Missing Fields. Faileded to createblog try again.",
      };
    }

    const { title, description, content, image, category } =
      validatedFields.data;

    let rest;

    if (image.size !== 0) {
      console.log("There is an image");
      rest = await hadleImageUpload(image);
    }

    const payload = {
      title,
      description,
      content,
      category,
      image: rest,
    };

    console.log(payload);

    return { message: "Authentication success" };
  } catch (error) {
    console.log(error);
    return { message: "Sorry ders an err" };
  }
}

export async function ContactEmail(
  id: string,
  prevState: string | object | undefined,
  formData: FormData
) {
  try {
    const data = Object.fromEntries(formData.entries());

    const validatedFields = SendContactEmail.safeParse(data);

    // console.log(validatedFields.error);

    if (!validatedFields.success) {
      return {
        message: "seemed to have not worked properly, try again.",
      };
    }

    const { to, name, subject, content } = validatedFields.data;

    await sendMail({
      to: process.env.SMTP_EMAIL as string,
      name: name, // get user name
      subject,
      content,
    });

    return { message: "i am dead" };
  } catch (error) {
    console.log(error);
    return { message: "I am sorry but the request failed.... you got denied" };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("hate my life");

    return "success";
  } catch (error) {
    console.log(error);
    return "error dumbasds";
  }
}
