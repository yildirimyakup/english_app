import UserWord from "../../models/UserWord.js";

export const getUserWordService = async (userId: any) => {
  try {
    const words = await UserWord.find({ userId }).populate("wordId");
    return { message: "İşlem başarılı!", words: words };
  } catch (err: any) {
    return { message: err.message };
  }
};
