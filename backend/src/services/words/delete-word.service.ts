import Word from "../../models/Word.js";

export const deleteWordService = async (id: any) => {
  try {
    const word = await Word.findByIdAndDelete(id);
    if (!word) throw new Error("Kelime bulunamadı");
    return { message: "Kelime silindi ✅" };
  } catch (err: any) {
    return { message: err.message };
  }
};
