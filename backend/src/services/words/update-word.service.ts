import Word from "../../models/Word.js";

export const updateWordService = async (value: any, id: string) => {
  try {
    const word = await Word.findByIdAndUpdate(id, value, {
      new: true,
    });
    if (!word) throw new Error("Kelime bulunamadı");
    return { message: "Kelime güncellendi ✅", word };
  } catch (err: any) {
    return { message: err.message };
  }
};
