import type { Area } from "react-easy-crop";

const OUTPUT_SIZE = 512;

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", () => {
      reject(new Error("Failed to load image"));
    });
    image.src = src;
  });

export const cropImageToFile = async (
  imageSrc: string,
  pixelCrop: Area,
  fileName: string,
): Promise<File> => {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas is not available");
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    OUTPUT_SIZE,
    OUTPUT_SIZE,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("Failed to crop image"));
          return;
        }
        resolve(result);
      },
      "image/jpeg",
      0.9,
    );
  });

  const baseName = fileName.replace(/\.[^.]+$/u, "") || "avatar";
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
};
