const CLOUD_NAME = 'your_cloud_name';    // replace
const UPLOAD_PRESET = 'your_preset_name'; // replace

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  const data = await res.json();
  if (!data.secure_url) throw new Error('Upload failed');
  return data.secure_url;
};