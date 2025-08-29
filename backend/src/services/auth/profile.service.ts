import User from "../../models/User.js";

export const userProfile = async (id: any) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) throw new Error("Kullanıcı bulunamadı");
    return { message: "İşlem Başarılı", user };
  } catch (err: any) {
    return { message: err.message };
  }
};
