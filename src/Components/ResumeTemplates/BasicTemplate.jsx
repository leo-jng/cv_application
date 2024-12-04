export default function BasicTemplate({currentAvatarUrl, personaInfo, educationInfo, experienceInfo}){
    const placePersonalInfo = function() {
        
    }

    return(
        <>
        {/* profile image section */}
        <img 
            src={currentAvatarUrl}
            className="w-[150px] h-[150px] rounded-full border-2 border-red-400"
        />

        {/* personal information section */}

        {/* education section */}

        {/*experience section*/}
        </>
    )
}