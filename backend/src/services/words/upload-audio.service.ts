import path from "path";

interface UploadResponse {
  message: string;
  url?: string;
}

export const uploadFileService = (
  file: Express.Multer.File | undefined
): UploadResponse => {
  try {
    if (!file) {
      throw new Error("Dosya yok");
    }

    // Yüklenen dosya ismi + URL üret
    const fileUrl = `/uploads/audio/${file.filename}`;

    return {
      message: "Upload başarılı ✅",
      url: fileUrl,
    };
  } catch (err: any) {
    return {
      message: err.message || "Dosya yüklenemedi ❌",
    };
  }
};
