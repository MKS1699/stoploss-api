import mongoose from "mongoose";
import "dotenv/config";

export const stoplossConnect = async () => {
  try {
    const res = await mongoose.connect(process.env.STOPLOSS_DB_URL);
    if (res !== undefined || null) {
      console.log("Connected successfully to SL_DB.");
    }
  } catch (error) {
    return { error, message: "Unable to connect to SL_DB" };
  }
};
