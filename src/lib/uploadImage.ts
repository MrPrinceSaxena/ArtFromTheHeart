// src/lib/uploadImage.ts

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  console.log("Cloudinary env from Vite:", { cloudName, uploadPreset });

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing Cloudinary config. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary error:", data);
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  if (!data.secure_url) {
    console.error("Missing secure_url in Cloudinary response:", data);
    throw new Error("Invalid Cloudinary response");
  }

  return data.secure_url as string;
}
