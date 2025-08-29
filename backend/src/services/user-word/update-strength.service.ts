import UserWord from "../../models/UserWord.js";

export const updateStrengthService = async (id: any, change: number) => {
  try {
    const userWord = await UserWord.findById(id);
    if (!userWord) throw new Error("Kayıt yok");

    userWord.strength = Math.max(1, userWord.strength + change);
    userWord.lastReviewed = new Date();
    await userWord.save();

    return { message: "Strength güncellendi ✅", userWord };
  } catch (err: any) {
    return { message: err.message };
  }
};
