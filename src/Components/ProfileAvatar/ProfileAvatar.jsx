import UpdateAvatarModal from "./UpdateAvatarModal";
export default function ProfileAvatar({ avatarUrl, avatarModalOpen, setAvatarModalOpen }) {
    // updates the profile picture with the new edited image
    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
    };
    
    return (
        <>
        <div className="relative">
            <div className="font-bold">Profile Image</div>
            <img
                src={avatarUrl.current}
                alt="Profile Avatar"
                // the current classname styles how the image will show up
                className="w-[150px] h-[150px] rounded-full border-2 border-red-400"
                // once onclick is clicked, the modal state will update
                onClick={() => setAvatarModalOpen(true)}
            />
        </div>

        {/* opens profile picture modal when image is clicked */}
        {avatarModalOpen && (
        // UpdateAvatarModal -> ImageCropper -> CropImage
            <UpdateAvatarModal
                updateAvatar={updateAvatar}
                closeModal={() => setAvatarModalOpen(false)}
            />
        // console.log("MODAL OPENS")
        )}
        </>
    )
}