import { createRef, useRef, useState } from "react";
//import UpdateAvatarModal from "./Components/ProfileAvatar/UpdateAvatarModal";
import PersonalDetails from "./Components/PersonalDetails";
import "./App.css";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import PersonalDetailsComponent from "./Components/CanvasComponents/PersonalDetailsComponent";
import EducationComponent from "./Components/CanvasComponents/EducationComponent";
import ExperienceComponent from "./Components/CanvasComponents/ExperienceComponent";
import ProfileAvatar from "./Components/ProfileAvatar/ProfileAvatar";

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
};

const defaultExperienceInfoList = {
  "Exp_base1" : {...defaultEducationInfo}
}

const defaultPersonalDetailsComponent = {
  componenttype: "personaldetails",
  isDragging: false,
  x: 20,
  y: 20,
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
}

const defaultEducationComponent = {
  componenttype: "education",
  isDragging: false,
  x: 20,
  y: 20,
  degree: "",
  major: "",
  institution: "",
  graduationmonth: "",
  graduationyear: "",
  gpa: "",
};

const defaultExperienceComponent = {
  componenttype: "experience",
  isDragging: false,
  x: 20,
  y: 20,
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
};

const testOnCanvasComponents = {
  "test1": {
    componenttype: "personaldetails",
    isDragging: false,
    x: 20,
    y: 20,
    firstname: "John",
    middlename: "",
    lastname: "Doe",
    suffix: "",
    preferredname: "John",
    phonenumber: "0000000000",
    emailaddress: "john@doe.com",
    linkedin: "linkedin.com",
    personalwebsite: "johndoe.com",
    github: "github.com",
    facebook: "",
    instagram: "",
    twitter: "",
    bluesky: "",
    other: "",
  },
  "test2" : {
    componenttype: "education",
    isDragging: false,
    x: 20,
    y: 20,
    degree: "Bachelors",
    major: "Computer Science",
    institution: "Massechusetts Institute of Technology",
    graduationmonth: "Some Month",
    graduationyear: "Some Year",
    gpa: "",
  },
  "test3" : {
    componenttype: "experience",
    isDragging: false,
    x: 20,
    y: 20,
    jobposition: "Software Engineer",
    companyname: "Apple",
    companylocation: "San Francisco",
    employmenttype: "Full-Time",
    startdate: "00-00-0000",
    enddate: "12-12-2000  ",
    jobachievement_no1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    jobachievement_no2: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobachievement_no3: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    jobachievement_no4: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
}

function App() {

  // avatarUrl is defaulted to a image if no image is selected
  const avatarUrl = useRef("src/assets/default_pfpv2.jpg");
  // boolean state that keeps track of whether or not the profile image modal is open
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  // const [testSourceImageState, setTestSourceImageState] = useState("src/assets/default_pfpv2.jpg")
  const [imgSrc, setImgSrc] = useState("src/assets/default_pfpv2.jpg");
  const [error, setError] = useState("");
  // stores image edit data, it is required that they be in separate states bc of the attributes that cropper component takes
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // these are the states for the input components
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [educationInfo, setEducationInfo] = useState(defaultEducationInfo);
  const [experienceInfoList, setExperienceInfoList] = useState(defaultExperienceInfoList)

  // use empty object, but it will hold nested objects just like experienceInfoList
  // it will hold ondrag boolean, x coordinate, and y coordinate
  const [onCanvasComponents, setOnConvasComponents] = useState(testOnCanvasComponents); 

  // generates a random key for state objects in experience and oncanvascomponents
  const generateRandomKey = () => {
    let resultString = "";
    const alphabets = "abcdefghijklmnopqrstuvwxyz1234567890"
    for (let i = 0; i <= 15; i++) {
      resultString+= alphabets[Math.floor(Math.random() * alphabets.length)]
    }
    return "Exp_" + resultString; // experience key will in the format of Exp_<randomString>
  };

  // addes a new experience key-value pair to experience state object everytime
  // the add new experience button is clicked.
  const addNewExperience = () => {
    const newKey = generateRandomKey();
    setExperienceInfoList((prevState) => ({
      ...prevState,
      [newKey]: { ... defaultEducationInfo}
    }))
  }

  return (
    <>
    <section> 
      <h1> Creation Panel</h1>

      <ProfileAvatar 
        avatarUrl={avatarUrl} 
        avatarModalOpen={avatarModalOpen} 
        setAvatarModalOpen={setAvatarModalOpen}
        // testSourceImageState={testSourceImageState} 
        imgSrc={imgSrc} setImgSrc={setImgSrc}
        error={error} setError={setError}
        crop={crop} setCrop={setCrop}
        rotation={rotation} setRotation={setRotation}
        zoom={zoom} setZoom={setZoom}
        croppedAreaPixels={croppedAreaPixels} setCroppedAreaPixels={setCroppedAreaPixels}
        croppedImage={croppedImage} setCroppedImage={setCroppedImage}
      />

      <PersonalDetails ComponentEditStatus={personalInfo.editstatus} setPersonalInfo={setPersonalInfo} />
      <Education ComponentEditStatus={educationInfo.editstatus} setEducationInfo={setEducationInfo} o1={educationInfo}/>
      {/* For experience components, I can simply create a new component right here for every different experience.
      Every new component generated will generate a new key-value pair of key: defaultExperienceInfo.
      Deleting the Component will delete it from the key and the value object from the state Object. */}

      <button onClick={() => addNewExperience()}>Add New Experience</button>
      {Object.keys(experienceInfoList).map((ExpKey) => {
        return <Experience ExpKey={ExpKey} ComponentEditStatus={experienceInfoList[ExpKey].editstatus} experienceInfoList={experienceInfoList} setExperienceInfoList={setExperienceInfoList} 
        // presentlyWorking={false}
        />
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
  
      </section>
      <section>
        <h1>Render Panel</h1>
      </section>
      <section>
        <h1>Canvas Panel</h1>
        <Stage width={768} height={1024}>
          <Layer>
            <Rect fill="white" width={768} height={1024} />

            {/* Renders components based on what is stored in the onCanvasComponenet state object, including their positions */}
            {Object.keys(onCanvasComponents).map((keyName) => {
              if (onCanvasComponents[keyName].componenttype == "personaldetails") {
                return <PersonalDetailsComponent CompKey={keyName} onCanvasComponents={onCanvasComponents} setOnConvasComponents={setOnConvasComponents}/>
              } 
              if (onCanvasComponents[keyName].componenttype == "education") {
                return <EducationComponent CompKey={keyName} onCanvasComponents={onCanvasComponents} setOnConvasComponents={setOnConvasComponents}/>
              }
              if (onCanvasComponents[keyName].componenttype == "experience") {
                return <ExperienceComponent CompKey={keyName} onCanvasComponents={onCanvasComponents} setOnConvasComponents={setOnConvasComponents}/>
              }
            })}
            {/* <PersonalDetailsComponent onCanvasComponents={onCanvasComponents} setOnConvasComponents={setOnConvasComponents}/> */}
          </Layer>
        </Stage>
      </section>
    </>
  );
}

export default App;
