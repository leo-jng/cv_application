// import UpdateAvatarModal from "./UpdateAvatarModal";
// import ImageCropper from "./ImageCropper";
import { useRef, useState } from "react";
import { Box, Stack, Slider } from "@mui/material";
import getCroppedImg from "./cropimage";
import Cropper from "react-easy-crop";

export default function ProfileAvatar({
  imgSrc,
  setImgSrc,
  error,
  setError,
  crop,
  setCrop,
  rotation,
  setRotation,
  zoom,
  setZoom,
  croppedAreaPixels,
  setCroppedAreaPixels,
  croppedImage,
  setCroppedImage,
  avatarModalOpen,
  setAvatarModalOpen,
  onCanvasComponents,
  setOnConvasComponents,
  generateRandomKey,
}) {
  // adds the image to onCanvasComponentState
  const addImageToCanvas = () => {
    if (croppedImage == null) {
      console.log("No Profile Image Added");
      return;
    }
    const CompKey = generateRandomKey(onCanvasComponents);
    const imageData = new window.Image();
    imageData.src = croppedImage;
    console.log("current image", croppedImage);
    setOnConvasComponents((prevState) => ({
      ...prevState,
      [CompKey]: {
        componenttype: "profileavatar",
        isDragging: false,
        x: 20,
        y: 20,
        // image: (croppedImage == null ? imgSrc : croppedImage)
        image: imageData,
      },
    }));
  };

  return (
    <>
      {/* profile image displayed */}
      <div className="relative">
        <div className="font-bold">Profile Image</div>
        <img
          // src={avatarUrl.current}
          src={croppedImage == null ? imgSrc : croppedImage}
          alt="Profile Avatar"
          // the current classname styles how the image will show up
          className="w-[150px] h-[150px] rounded-full border-2 border-red-400"
          // once onclick is clicked, the modal state will update
          onClick={() => setAvatarModalOpen(true)}
        />
        <button onClick={addImageToCanvas}>Render on Canvas</button>
      </div>

      {/* opens profile picture modal when image is clicked */}
      {avatarModalOpen && (
        // UpdateAvatarModal -> ImageCropper -> CropImage
        <UpdateAvatarModal
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          error={error}
          setError={setError}
          crop={crop}
          setCrop={setCrop}
          rotation={rotation}
          setRotation={setRotation}
          zoom={zoom}
          setZoom={setZoom}
          croppedAreaPixels={croppedAreaPixels}
          setCroppedAreaPixels={setCroppedAreaPixels}
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
          // updateAvatar={updateAvatar}
          closeModal={() => setAvatarModalOpen(false)}
        />
        // console.log("MODAL OPENS")
      )}
    </>
  );
}

const UpdateAvatarModal = ({
  imgSrc,
  setImgSrc,
  error,
  setError,
  crop,
  setCrop,
  rotation,
  setRotation,
  zoom,
  setZoom,
  croppedAreaPixels,
  setCroppedAreaPixels,
  croppedImage,
  setCroppedImage,
  updateAvatar,
  closeModal,
  // avatarUrl,
  // avatarModalOpen, setAvatarModalOpen
}) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      area-modal="true"
    >
      {/* backdrop color */}
      <div className="fixed inset-0 bg-red-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          {/* modal color */}
          <div
            className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounted-2x1 bg-slate-100
                      text-state-100 text-left shadow-xl transition-all"
          >
            {/* internal feature container */}
            <div className="px-5 py-4 bg-red-500">
              {/* exit button */}
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center
                                  text-gray-400 hover:bg-gray-700 focus: outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>x
              </button>

              <ImageCropper
                imgSrc={imgSrc}
                setImgSrc={setImgSrc}
                error={error}
                setError={setError}
                crop={crop}
                setCrop={setCrop}
                rotation={rotation}
                setRotation={setRotation}
                zoom={zoom}
                setZoom={setZoom}
                croppedAreaPixels={croppedAreaPixels}
                setCroppedAreaPixels={setCroppedAreaPixels}
                croppedImage={croppedImage}
                setCroppedImage={setCroppedImage}
                //   updateAvatar={updateAvatar}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCropper = ({
  imgSrc,
  setImgSrc,
  error,
  setError,
  crop,
  setCrop,
  rotation,
  setRotation,
  zoom,
  setZoom,
  croppedAreaPixels,
  setCroppedAreaPixels,
  croppedImage,
  setCroppedImage,
  closeModal,
}) => {
  // const imgRef = useRef(null);
  // const previewCanvasRef = useRef(null);
  const MIN_DIMENSION = 150;

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
          //   return setImgSrc(""); //this is no longer necessary bc I want the image editor to be opend all the time
          // if error, then the editor will simply stay with the old picture, be it the default
          // image or a previously selected picture.
          return; //the function will return so nothing else is triggered.
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
      console.log("done cropping, current cropped image:", currCroppedImage);
      // when image is successfully cropped, use setCroppedImage to set to current cropped image
      // and the app will rerender and use the croppedimage bc croppedimage's state is no longer null.
      setCroppedImage(currCroppedImage);
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
      {/* if any errors exist, it will show up here*/}
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {/* if image is successfully selected, open cropper */}
      {/* {imgSrc && ( // we no longer have to consider if imgSrc is empty so we can remove this conditional // no, I can use it if I don't want the default image
      // the user has to provide a image of their own! */}
      {imgSrc != "src/assets/default_pfpv2.jpg" && (
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
