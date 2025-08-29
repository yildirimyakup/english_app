import Word, { IWord } from "../../models/Word.js";

// Yeni kelime ekle
export const addSingleWordService = async (word: IWord) => {
  try {
    const newWord = new Word(word);
    await newWord.save();
    return { word: newWord, message: "İşlem Başarılı" };
  } catch (err: any) {
    return { message: err.message };
  }
};
