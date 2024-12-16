import { useRef, useState } from "react";
import { Box, Stack, Slider } from "@mui/material";
import getCroppedImg from "./cropimage";
import Cropper from "react-easy-crop";

const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar }) => {
  // const imgRef = useRef(null);
  // const previewCanvasRef = useRef(null);

  // stores the currently selected image
  const [imgSrc, setImgSrc] = useState("");
  // stores error if selected image does not meet requirement
  const [error, setError] = useState("");

  // stores image edit data
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // can switch between croppedArea and croppedAreaPixel for testing purposes
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // opens file manager to select image file and set image source state
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(
      file
    ); /*This function has to be used to allow webpages to load image previews, and it must be done after the images are onloaded to properly process or there will be issues*/
  };

  const showCroppedImage = async () => {
    try {
      console.log("this is a test", imgSrc, croppedAreaPixels, rotation);
      const currCroppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("done cropping", { currCroppedImage });
      // setCroppedImage(currCroppedImage);
      // when image is successfully cropped, use updateAvatar to update avatarUrl reference in app.jsx
      updateAvatar(currCroppedImage);
      // close model afterwards
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          // run onSelectFile when choose profile photo is clicked, it will open file manager for file selection
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {/* if any errors exist, it will show up here, and image editor will not trigger bc imgSrc is set to "" when errors exists. */}
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {/* if image is successfully selected, open cropper */}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <div className="relative w-full h-[500px] bg-black">
            <Cropper
              image={imgSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="flex flex-col p-16 items-stretch">
            <Box sx={{ width: 350 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
                justifyContent="space-between"
              >
                <div>ZOOM</div>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  sx={{
                    padding: "22px 0px",
                    width: "270px",
                  }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </Stack>
            </Box>

            <Box sx={{ width: 350 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
                justifyContent="space-between"
              >
                <div>ROTATE</div>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  sx={{
                    padding: "22px 0px",
                    width: "270px",
                  }}
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </Stack>
            </Box>
            <button className="bg-blue-400 rounded" onClick={showCroppedImage}>
              Crop
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper;
