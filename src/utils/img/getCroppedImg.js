export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  outputFormat = 'image/jpeg',
  quality = 0.92,
  returnDataUrl = false,
) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;
    const timer = setTimeout(() => reject(new Error('Crop timeout')), 5000);

    image.onload = () => {
      clearTimeout(timer);
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Could not get canvas context'));
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas is empty'));
          if (returnDataUrl) {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(blob);
          } else {
            resolve(blob);
          }
        },
        outputFormat,
        quality,
      );
    };

    image.onerror = (e) => {
      clearTimeout(timer);
      reject(new Error('Image load error'));
    };
  });
}
