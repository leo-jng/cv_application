import ImageCropper from "./ImageCropper";

const UpdateAvatarModal = ({ updateAvatar, closeModal }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      area-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div
            className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounted-2x1 bg-slate-100
                    text-state-100 text-left shadow-xl transition-all"
          >
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center
                                text-gray-400 hover:bg-gray-700 focus: outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                x
              </button>

              <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAvatarModal;
