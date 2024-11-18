import { createRef, useRef, useState } from "react";
import UpdateAvatarModal from "./Components/ProfileAvatar/UpdateAvatarModal";
import "./App.css";

const defaultPersonalInfo = {
  firstname: "",
  middlename: "",
  lastname: "",
  suffix: "",
  phonenumber: "",
  emailaddress: "",
  linkedinprofile: "",
  githubprofile: "",
  personalwebsite: "",
};

const defaultEducationInfo = {
  collegename: "",
  graduationmonthyear: "",
  major: "",
  degree: "",
};

const defaultExperienceInfo = {
  // requires 2 experiences

  // 1st experience
  companyname_req1: "",
  companylocation_req1: "",
  employmentposition_req1: "",
  employmenttype_req1: "",
  employmentstart_monthyear_req1: "",
  employmentend_monthyear_req1: "",
  employmentachievements_req1: "",

  // 2nd experience
  companyname_req2: "",
  companylocation_req2: "",
  employmentposition_req2: "",
  employmenttype_req2: "",
  employmentstart_monthyear_req2: "",
  employmentend_monthyear_req2: "",
  employmentachievements_req2: "",

  // the rest are optional and can be added via user input
};

function App() {
  const [count, setCount] = useState(0);

  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [educationInfo, setEducationInfo] = useState(defaultEducationInfo);
  const [experienceInfo, setExperienceInfo] = useState(defaultExperienceInfo);

  const avatarUrl = useRef("src/assets/default_pfp.jpg");
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  return (
    <>
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Profile Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-red-400"
          onClick={() => setAvatarModalOpen(true)}
        />
      </div>

      {avatarModalOpen && (
        <UpdateAvatarModal
          updateAvatar={updateAvatar}
          closeModal={() => setAvatarModalOpen(false)}
        />
        // console.log("MODAL OPENS")
      )}

      {/* <form>
        <fieldset id="personal_details">
          <legend> Personal Details </legend>
          <label for="first_name">First name:</label> <br />
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="John"
          />{" "}
          <br />
          <label for="last_name">Last name:</label> <br />
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Doe"
          />{" "}
          <br />
          <label for="phone_number">Phone Number:</label> <br />
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            placeholder="000-000-0000"
          ></input>{" "}
          <br />
          <label for="email_address">Email:</label> <br />
          <input
            type="email"
            id="email_address"
            name="email_address"
          ></input>{" "}
          <br />
          <label for="linkedin_profile">Linkedin:</label> <br />
          <input type="url" id="linkedin_url" name="linkedin_url"></input>{" "}
          <br />
          <label for="personal_github">Github:</label> <br />
          <input
            type="url"
            id="personal_github"
            name="personal_github"
          ></input>{" "}
          <br />
          <label for="personal_website">Your Website:</label> <br />
          <input
            type="url"
            id="personal_website"
            name="personal_website"
          ></input>{" "}
          <br />
        </fieldset>
      </form> */}
    </>
  );
}

export default App;
