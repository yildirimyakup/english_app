import UserWord from "../../models/UserWord.js";

export const addUserWordService = async (userId: any, wordId: any) => {
  try {
    const userWord = new UserWord({ userId, wordId });
    await userWord.save();
    return { message: "Kelime eklendi ✅", userWord };
  } catch (err: any) {
    return { message: err.message };
  }
};
