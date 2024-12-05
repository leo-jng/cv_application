// This PersonalDetails Componet contains the inputs that will affect the
// data held in the PersonalInfo state object.
// This includes: First Name, Middle Name (Optional), Last Name, Suffix/Honorifics (Optional)
//                Preferred Name, Pronouns (Unnecessary)
//                Phone Number, Email Address
//                City, State, and Country
//                Linkedin, Personal Website
//                Social Media Links

export default function PersonalDetails({ setPersonalInfo }) {
  // updateProfile will take the input event and a specified keyname
  // to update the value held in a keyname in the PersonalInfo state object
  const updateProfile = (e, keyname) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [keyname]: e.target.value,
    }));
  };

  const saveProfileInfo = (e) => {
    e.preventDefault();
    console.log("personal info saved")
  }

  return (
    <>
      {/* Player Profile Section */}
      <section className="bg-gray-800 border w-1/2">
      {/* use onSubmit for save and regular onClick for edit. Onsubmit will only trigger when required areas are filled. */}
        <form onSubmit={(e) => saveProfileInfo(e)} id="personalinfoform"> 
        <div className="font-bold">Personal Details</div>
        <div className="relative">
          {/* First Name, Middle Name (Optional), Last Name, Suffix/Honorfics (Optional) */}
          <input
            type="text"
            placeholder="First Name"
            onChange={(event) => updateProfile(event, "firstname")}
            required
          />
          <input
            type="text"
            placeholder="Middle Name"
            onChange={(event) => updateProfile(event, "middlename")}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(event) => updateProfile(event, "lastname")}
            required
          />
          <select defaultValue={""} onChange={(event) => updateProfile(event, "suffix")}>
            <option value="" disabled>
              Select Suffix/Honorifics
            </option>
            <option value="jr">Jr.</option>
            <option value="sr">Sr.</option>
            {/* The rest can be placed later */}
          </select>
          {/* ------------------------------------------------------- */}

          {/* Preferred Name*/}
          <input
            type="text"
            placeholder="Preferred Name"
            onChange={(event) => updateProfile(event, "preferredname")}
          />
          {/* ------------------------------------------------------- */}

          {/* Phone Number, Email Address */}
          <input
            type="tel"
            placeholder="0123456789"
            onChange={(event) => updateProfile(event, "phonenumber")}
            required
          />
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(event) => updateProfile(event, "emailaddress")}
            required
          />
          <br />
          {/* ------------------------------------------------------- */}

          {/* City, State/Province, and Country */}
          {/* <input /> */}
          {/* ------------------------------------------------------- */}

          {/* Linkedin, Personal Website */}
          <input
            type="text"
            placeholder="Linkedin"
            onChange={(event) => updateProfile(event, "linkedin")}
          />
          <input
            type="text"
            placeholder="Personal Website"
            onChange={(event) => updateProfile(event, "personalwebsite")}
          />
          <br />
          {/* ------------------------------------------------------- */}

          {/* Social Media Links */}
          <input
            type="text"
            placeholder="Github"
            onChange={(event) => updateProfile(event, "github")}
          />
          <input
            type="text"
            placeholder="Facebook"
            onChange={(event) => updateProfile(event, "facebook")}
          />
          <input
            type="text"
            placeholder="Instagram"
            onChange={(event) => updateProfile(event, "instagram")}
          />
          <input
            type="text"
            placeholder="X (Formerly Twitter)"
            onChange={(event) => updateProfile(event, "twitter")}
          />
          <input
            type="text"
            placeholder="Bluesky"
            onChange={(event) => updateProfile(event, "bluesky")}
          />
          <input
            type="text"
            placeholder="Others"
            onChange={(event) => updateProfile(event, "other")}
          />
        </div>
        <button type="submit" form="personalinfoform">Save</button>
        <button type="button">Edit</button>
        {/* edit button would be greyed out until save is pressed. */}
        </form>
      </section>
    </>
  );
}
