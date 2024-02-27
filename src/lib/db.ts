import mongoose from "mongoose";


const dbConnect = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL as string)
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect