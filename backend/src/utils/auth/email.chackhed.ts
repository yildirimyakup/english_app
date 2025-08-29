import User from "../../models/User.js";

const TAG = "utils-> email.checked.ts :";
const isEmail = async (email: string): Promise<boolean> => {
  try {
    const user = await User.findOne({ email });
    return user !== null; // varsa true yoksa false döner
  } catch (error: any) {
    console.error(TAG, "Email kontrolünde hata:", error);
    return false;
  }
};
export default isEmail;
