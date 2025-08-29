import Word from "../../models/Word.js";

export const findWordById = async (id: any) => {
  try {
    const word = await Word.findById(id);
    if (!word) throw new Error("Kelime bulunamadı");
    return { message: "İşlem Başarılı", word };
  } catch (err: any) {
    return { message: err.message };
  }
};
