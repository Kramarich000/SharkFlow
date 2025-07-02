import cloudinaryApi from '@lib/http/cloudinary';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function uploadImgToCloudinary(formData) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  return await apiResponsesHandler(() =>
    cloudinaryApi.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    ),
  );
}
