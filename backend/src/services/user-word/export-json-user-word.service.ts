import UserWord from "../../models/UserWord.js";

export const exportJsonUserWordService = async (userId: any) => {
  try {
    const words = await UserWord.find({ userId }).populate(
      "wordId",
      "english turkish level example audio pos tags phonetic"
    );

    return {
      exportedAt: new Date(),
      count: words.length,
      words: words.map((uw) => ({
        wordId: uw.wordId,
        strength: uw.strength,
        lastReviewed: uw.lastReviewed,
      })),
    };
  } catch (err: any) {
    return { message: err.message };
  }
};
