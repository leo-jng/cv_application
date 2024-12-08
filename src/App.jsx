import { createRef, useRef, useState } from "react";
import UpdateAvatarModal from "./Components/ProfileAvatar/UpdateAvatarModal";
import PersonalDetails from "./Components/PersonalDetails";
import "./App.css";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import BasicTemplate from "./Components/ResumeTemplates/BasicTemplate";

const defaultPersonalInfo = {
  firstname: "",
  middlename: "",
  lastname: "",
  suffix: "",
  preferredname: "",
  phonenumber: "",
  emailaddress: "",
  linkedin: "",
  personalwebsite: "",
  github: "",
  facebook: "",
  instagram: "",
  twitter: "",
  bluesky: "",
  other: "",
  editstatus: true,
};

const defaultEducationInfo = {
  degree: "",
  major: "",
  institution: "",
  graduationmonth: "",
  graduationyear: "",
  gpa: "",
  editstatus: true,
};

const defaultExperienceInfo = {
  // requires 1 experience minimum

  jobposition: "",
  companyname: "",
  companylocation: "",
  employmenttype: "",
  startdate: "",
  enddate: "",
  jobachievement_no1: "",
  jobachievement_no2: "",
  jobachievement_no3: "",
  jobachievement_no4: "",
  editstatus: true
  // the rest are optional and can be added via user input
};

const defaultExperienceInfoList = {
  "Exp_base1" : {...defaultEducationInfo}
}

function App() {
  // const [count, setCount] = useState(0);

  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [educationInfo, setEducationInfo] = useState(defaultEducationInfo);
  // const [experienceInfo, setExperienceInfo] = useState(defaultExperienceInfo); // set to remove
  const [experienceInfoList, setExperienceInfoList] = useState(defaultExperienceInfoList)


  const avatarUrl = useRef("src/assets/default_pfp.jpg");
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  // const [genResume, setGenResume] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const generateRandomKey = () => {
    let resultString = "";
    const alphabets = "abcdefghijklmnopqrstuvwxyz1234567890"
    for (let i = 0; i <= 15; i++) {
      resultString+= alphabets[Math.floor(Math.random() * alphabets.length)]
    }
    return "Exp_" + resultString; // experience key will in the format of Exp_<randomString>
  };

  const addNewExperience = () => {
    const newKey = generateRandomKey();
    setExperienceInfoList((prevState) => ({
      ...prevState,
      [newKey]: { ... defaultEducationInfo}
    }))
  }

  return (
    <>
      <div className="relative">
      <div className="font-bold">Profile Image</div>
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

      <PersonalDetails ComponentEditStatus={personalInfo.editstatus} setPersonalInfo={setPersonalInfo} />
      <Education ComponentEditStatus={educationInfo.editstatus} setEducationInfo={setEducationInfo} o1={educationInfo}/>
      {/* For experience components, I can simply create a new component right here for every different experience.
      Every new component generated will generate a new key-value pair of key: defaultExperienceInfo.
      Deleting the Component will delete it from the key and the value object from the state Object. */}

      <button onClick={() => addNewExperience()}>Add New Experience</button>
      {Object.keys(experienceInfoList).map((ExpKey) => {
        return <Experience ExpKey={ExpKey} ComponentEditStatus={experienceInfoList[ExpKey].editstatus} setExperienceInfoList={setExperienceInfoList}/>
      })}
      {/* <Experience setExperienceInfo={setExperienceInfo} o1={experienceInfo}/> */}
      {console.log(
        "all objects",
        personalInfo,
        educationInfo,
        experienceInfoList
      )}
      {/* I should put the save and edit button into each section component instead for higher 
      customization capability.
      Having a save all at once and edit all at once buttons helps save efficiently from having to
      to save in object in real time.
      */}
      {/* task: implement these 2 buttons into the 3 components.
      Use boolean states to indicate save status.
      On save, save inputs and lock the inputs.
      On edits, unlock inputs to edit and generate cancel edit button.
              revert back to saved inputs on cancal and lock input.*/}
      {/* <button>Save Info</button> 
      <button>Edit Info</button> */}

      {/* Once all save status are confirmed true, I can generate a list of resumes from all the resume templates 
      I've made in the ResumeTemplate directory. */}
      {/* <button onClick={() => setGenResume(!genResume)}>Generate Resumes</button> */}

      {/* {genResume && <BasicTemplate currentAvatarUrl={avatarUrl.current} personaInfo={personalInfo} educationInfo={educationInfo} experienceInfo={experienceInfo} />} */}
        {/* Instead of rendering a resume that in a very clunky way, it would be more organic to make them drag and drop.
        I will use kanvajs library to drag copies of the saved component into the canvas. 
        The copies are able to be deleted.
        */}
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
