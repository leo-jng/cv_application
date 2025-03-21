// This PersonalDetails Componet contains the inputs that will affect the
// data held in the PersonalInfo state object.
// This includes: First Name, Middle Name (Optional), Last Name, Suffix/Honorifics (Optional)
//                Preferred Name, Pronouns (Unnecessary)
//                Phone Number, Email Address
//                City, State, and Country
//                Linkedin, Personal Website
//                Social Media Links

export default function PersonalDetails({
  ComponentEditStatus,
  personalInfo,
  setPersonalInfo,
  onCanvasComponents,
  setOnConvasComponents,
  generateRandomKey,
}) {
  const saveProfileInfo = (e) => {
    e.preventDefault();
    console.log(
      "personal info saved",
      e.target[1].value, // degree
      e.target[2].value, // major
      e.target[3].value, // college
      e.target[4].value, // grad month
      e.target[5].value, // grad year
      e.target[6].value // gpa
    );

    setPersonalInfo((prevState) => ({
      ...prevState,
      // e.target[0] of the form is fieldset, so first input actually start at 1
      ["firstname"]: e.target[1].value,
      ["middlename"]: e.target[2].value,
      ["lastname"]: e.target[3].value,
      ["suffix"]: e.target[4].value,
      ["preferredname"]: e.target[5].value,
      ["phonenumber"]: e.target[6].value,
      ["emailaddress"]: e.target[7].value,
      ["linkedin"]: e.target[8].value,
      ["personalwebsite"]: e.target[9].value,
      ["github"]: e.target[10].value,
      ["facebook"]: e.target[11].value,
      ["instagram"]: e.target[12].value,
      ["twitter"]: e.target[13].value,
      ["bluesky"]: e.target[14].value,
      ["other"]: e.target[15].value,
      ["editstatus"]: false,
    }));
  };

  const editPersonalInfo = () => {
    console.log(
      "edit button clicked!",
      "editstatus for personalinfo set to: ",
      !ComponentEditStatus
    );
    setPersonalInfo((prevState) => ({
      ...prevState,
      ["editstatus"]: !ComponentEditStatus, // this will indicate that the current componet is saved, and no further editing is allowed
    }));
  };

  const addComponentToCanvas = () => {
    // I simply have to grab the data saved into the input component state. I don't have to read from
    // the event. I don't have to check for default empty input bc the render button is empty by default,
    // and it requires input to save.
    // e.preventDefault();
    console.log("add personal detail component to canvas!");
    const CompKey = generateRandomKey(onCanvasComponents);
    const CopyPersonalInfo = { ...personalInfo };
    setOnConvasComponents((prevState) => ({
      ...prevState,
      [CompKey]: {
        componenttype: "personaldetails",
        isDragging: false,
        x: 20,
        y: 20,
        fontsize: 12, //reactkonva text component takas number for fontsize attribute
        fontfamily: "Arial",
        firstname: CopyPersonalInfo["firstname"],
        lastname: CopyPersonalInfo["lastname"],
        phonenumber: CopyPersonalInfo["phonenumber"],
        emailaddress: CopyPersonalInfo["emailaddress"],
        linkedin: CopyPersonalInfo["linkedin"],
        personalwebsite: CopyPersonalInfo["personalwebsite"],
        github: CopyPersonalInfo["github"],
        facebook: CopyPersonalInfo["facebook"],
        instagram: CopyPersonalInfo["instagram"],
        twitter: CopyPersonalInfo["twitter"],
        bluesky: CopyPersonalInfo["bluesky"],
        other: CopyPersonalInfo["other"],
      },
    }));
  };

  return (
    <>
      {/* Player Profile Section */}
      <section className="bg-gray-800 border w-2/3">
        {/* use onSubmit for save and regular onClick for edit. Onsubmit will only trigger when required areas are filled. */}
        <form onSubmit={(e) => saveProfileInfo(e)} id="personalinfoform">
          <div className="font-bold">Personal Details</div>
          <fieldset
            className="relative"
            disabled={ComponentEditStatus == true ? false : true} // disables form inputs if editstatus is false, enables if editstatus is true
          >
            {/* First Name, Middle Name (Optional), Last Name, Suffix/Honorfics (Optional) */}
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Middle Name" />
            <input type="text" placeholder="Last Name" required />
            <select defaultValue={""}>
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
              // onChange={(event) => updateProfile(event, "preferredname")}
            />
            {/* ------------------------------------------------------- */}

            {/* Phone Number, Email Address */}
            <input type="tel" placeholder="0123456789" required />
            <input type="email" placeholder="example@example.com" required />
            <br />
            {/* ------------------------------------------------------- */}

            {/* City, State/Province, and Country */}
            {/* <input /> */}
            {/* ------------------------------------------------------- */}

            {/* Linkedin, Personal Website */}
            <input type="text" placeholder="Linkedin" />
            <input type="text" placeholder="Personal Website" />
            <br />
            {/* ------------------------------------------------------- */}

            {/* Social Media Links */}
            <input type="text" placeholder="Github" />
            <input type="text" placeholder="Facebook" />
            <input type="text" placeholder="Instagram" />
            <input type="text" placeholder="X (Formerly Twitter)" />
            <input type="text" placeholder="Bluesky" />
            <input type="text" placeholder="Others" />
          </fieldset>
          <button
            type="submit"
            form="personalinfoform"
            className={
              ComponentEditStatus == true
                ? "bg-green-700"
                : "bg-slate-900 text-slate-500 hover:border-slate-900"
            }
            disabled={ComponentEditStatus == true ? false : true}
          >
            Save
          </button>

          <button
            type="button"
            onClick={editPersonalInfo}
            className={
              ComponentEditStatus == true
                ? "bg-slate-900  text-slate-500 hover:border-slate-900"
                : "bg-green-700"
            }
            disabled={ComponentEditStatus == true ? true : false}
          >
            Edit
          </button>
          {/* edit button would be greyed out until save is pressed. */}

          <button
            type="button"
            onClick={addComponentToCanvas}
            className={
              ComponentEditStatus == true
                ? "bg-slate-900  text-slate-500 hover:border-slate-900"
                : "bg-green-700"
            }
            disabled={ComponentEditStatus == true ? true : false}
          >
            Render
          </button>
          {/* Render button takes in the updated personalInfo state object and pushes a cloned copy values into onCanvasComponent state object */}
        </form>
      </section>
    </>
  );
}
