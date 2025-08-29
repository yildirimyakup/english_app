import Word from "../../models/Word.js";

export const exportJsonService = async () => {
  try {
    const words = await Word.find().select(
      "english turkish level example audio pos tags synonyms antonyms phonetic xpValue frequency"
    );
    return { exportedAt: new Date(), words };
  } catch (err: any) {
    return { message: err.message };
  }
};
