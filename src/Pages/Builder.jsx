import { createRef, useRef, useState } from "react";
//import UpdateAvatarModal from "./Components/ProfileAvatar/UpdateAvatarModal";
import PersonalDetails from "../Components/PersonalDetails";
// import PersonalDetails from "./Components/PersonalDetails";
// import "./App.css";
import "../App.css";
import Education from "../Components/Education";
import Experience from "../Components/Experience";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import ProfileAvatarComponent from "../Components/CanvasComponents/ProfileAvatarComponent";
import PersonalDetailsComponent from "../Components/CanvasComponents/PersonalDetailsComponent";
import EducationComponent from "../Components/CanvasComponents/EducationComponent";
import ExperienceComponent from "../Components/CanvasComponents/ExperienceComponent";
import ProfileAvatar from "../Components/ProfileAvatar/ProfileAvatar";
import CanvasUtility from "../Components/CanvasUtility/CanvasUtility";
import menuIcon from "../assets/menuIcon.svg";
import { NavLink } from "react-router";

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
  editstatus: true,
};

const defaultExperienceInfoList = {
  Exp_base1: { ...defaultEducationInfo },
};

// not used; mainly added for documentation purposes
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
};

// not used; mainly added for documentation purposes
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

// not used; mainly added for documentation purposes
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
// this is solely used for testing purposes, remove and replace with empty {} in production
const testOnCanvasComponents = {
  test1: {
    componenttype: "personaldetails",
    isDragging: false,
    x: 20,
    y: 20,
    fontsize: 12,
    firstname: "John",
    middlename: "Smith",
    lastname: "Doe",
    suffix: "",
    preferredname: "John",
    phonenumber: "0123456789",
    emailaddress: "john@doe.com",
    linkedin: "linkedin.com",
    personalwebsite: "johndoe.com",
    github: "github.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
    twitter: "twitter.com",
    bluesky: "bluesky.com",
    other: "othersite.com",
    fontfamily: "Arial",
  },
  test2: {
    componenttype: "education",
    isDragging: false,
    x: 20,
    y: 20,
    fontsize: 12, //reactkonva text component takas number for fontsize attribute
    degree: "Bachelors",
    major: "Computer Science",
    institution: "Massechusetts Institute of Technology",
    graduationmonth: "Some Month",
    graduationyear: "Some Year",
    gpa: "4.0",
    fontfamily: "Arial",
  },
  test3: {
    componenttype: "experience",
    isDragging: false,
    x: 20,
    y: 20,
    fontsize: 12, //reactkonva text component takas number for fontsize attribute
    jobposition: "Software Engineer",
    companyname: "Apple",
    companylocation: "San Francisco",
    employmenttype: "Full-Time",
    startdate: "00-00-0000",
    enddate: "12-12-2000  ",
    jobachievement_no1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    jobachievement_no2:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobachievement_no3:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    jobachievement_no4:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    fontfamily: "Arial",
  },
};

function Builder() {
  // boolean state that keeps track of whether or not the profile image modal is open
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  // const [testSourceImageState, setTestSourceImageState] = useState("src/assets/default_pfpv2.jpg")
  const [imgSrc, setImgSrc] = useState("src/assets/default_pfp.jpg");
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
  const [experienceInfoList, setExperienceInfoList] = useState(
    defaultExperienceInfoList
  );

  // use empty object, but it will hold nested objects just like experienceInfoList
  // it will hold ondrag boolean, x coordinate, and y coordinate
  const [onCanvasComponents, setOnConvasComponents] = useState(
    testOnCanvasComponents
  );
  //when a onCanvasComponent is clicked, update this state to hold the key of the clicked onCanvasComponent
  const [selectedCanvasComponent, setSelectedCanvasComponent] = useState(null);
  //when a onCanvasComponent is clicked, and the scale button is clicked, toggle scale switch state
  const [scaleToggle, setScaleToggle] = useState(false); // set to false by default

  // initialize a reference for canvas stage for save-to-pdf feature
  const canvasStageRef = useRef(null);

  // set a bool state for dropdown menus
  const [menuDropDownToggle, setMenuDropDownToggle] = useState(false);

  // generates a random key for state objects in experience and oncanvascomponents
  const generateRandomKey = (currentStateObject) => {
    console.log("currentStateObject", currentStateObject);
    let resultString = "Exp_";
    const alphabets = "abcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i <= 15; i++) {
      resultString += alphabets[Math.floor(Math.random() * alphabets.length)];
    }
    // have to check if the key already exists in the respective state object
    // the two state objects that will use this is the experiencelist state and onCanvasComponent state
    if (resultString in currentStateObject) {
      // if key already exists, call function again to generate another one
      resultString = generateRandomKey(currentStateObject);
    }
    return resultString;
  };

  // addes a new experience key-value pair to experience state object everytime
  // the add new experience button is clicked.
  const addNewExperience = () => {
    const newExpKey = generateRandomKey(experienceInfoList);
    setExperienceInfoList((prevState) => ({
      ...prevState,
      [newExpKey]: { ...defaultEducationInfo },
    }));
  };

  // deselecting onCanvasComponent function based on react konva documentation
  // Source: https://konvajs.org/docs/react/Transformer.html
  const deselectOnCanvasComponent = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedCanvasComponent(null); // set select to null
      console.log("Component has been deselected");
      setScaleToggle(false); // scale toggle will also be set to null
    }
  };

  const toggleMenu = () => {
    setMenuDropDownToggle(!menuDropDownToggle);
  };
  return (
    <>
      <div className="w-screen flow-root">
        <button onClick={toggleMenu} className="bg-black float-right">
          <img src={menuIcon} alt="Menu" />
        </button>
        {menuDropDownToggle && (
          // this is the dropdown menu, it should change to include signout, account settings, and account db on signing in
          <nav className="absolute right-0 top-12 z-10 bg-white" role="menu">
            <NavLink className="block px-4" role="menuitem" to="/signup">
              {" "}
              Signup{" "}
            </NavLink>
            <NavLink className="block px-4" role="menuitem" to="/signin">
              {" "}
              Signin{" "}
            </NavLink>
          </nav>
        )}
      </div>
      <div className="flow-root h-[1500px]">
        <section
          className={
            "float-left w-[650px] max-h-screen overflow-y-auto " +
            (avatarModalOpen == true ? "no-scrollbar" : "")
          }
        >
          <h1> Creation Panel</h1>

          <ProfileAvatar
            avatarModalOpen={avatarModalOpen}
            setAvatarModalOpen={setAvatarModalOpen}
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
            onCanvasComponents={onCanvasComponents}
            setOnConvasComponents={setOnConvasComponents}
            generateRandomKey={generateRandomKey}
          />

          <PersonalDetails
            ComponentEditStatus={personalInfo.editstatus}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            onCanvasComponents={onCanvasComponents}
            setOnConvasComponents={setOnConvasComponents}
            generateRandomKey={generateRandomKey}
          />

          <Education
            ComponentEditStatus={educationInfo.editstatus}
            educationInfo={educationInfo}
            setEducationInfo={setEducationInfo}
            onCanvasComponents={onCanvasComponents}
            setOnConvasComponents={setOnConvasComponents}
            generateRandomKey={generateRandomKey}
          />
          {/* For experience components, I can simply create a new component right here for every different experience.
      Every new component generated will generate a new key-value pair of key: defaultExperienceInfo.
      Deleting the Component will delete it from the key and the value object from the state Object. */}

          <button className="bg-black" onClick={() => addNewExperience()}>
            Add New Experience
          </button>
          {Object.keys(experienceInfoList).map((ExpKey) => {
            return (
              <Experience
                ExpKey={ExpKey}
                ComponentEditStatus={experienceInfoList[ExpKey].editstatus}
                experienceInfoList={experienceInfoList}
                setExperienceInfoList={setExperienceInfoList}
                onCanvasComponents={onCanvasComponents}
                setOnConvasComponents={setOnConvasComponents}
                generateRandomKey={generateRandomKey}
              />
            );
          })}

          {console.log(
            "all objects \n",
            "personalInfo:",
            personalInfo,
            "\n",
            "educationInfo:",
            educationInfo,
            "\n",
            "experienceInfoList:",
            experienceInfoList,
            "\n",
            "onCanvasComponents:",
            onCanvasComponents,
            "selectedCanvasComponent:",
            selectedCanvasComponent
          )}
        </section>

        <section className="float-right mr-[20px]">
          <h1>Canvas Panel</h1>
          <CanvasUtility
            canvasNode={canvasStageRef.current}
            isSelected={selectedCanvasComponent !== null}
            scaleToggle={scaleToggle}
            setScaleToggle={setScaleToggle}
            selectedCanvasComponent={selectedCanvasComponent}
            setSelectedCanvasComponent={setSelectedCanvasComponent}
            onCanvasComponents={onCanvasComponents}
            setOnConvasComponents={setOnConvasComponents}
          />

          <div id="canvas" className="bg-white h-[1024px] w-[768px]">
            <Stage
              // this ref is used to save canvas into image, and then into pdf
              ref={canvasStageRef}
              width={768}
              height={1024}
              // deselecting onCanvasComponent function based on react konva documentation
              onMouseDown={deselectOnCanvasComponent}
              onTouchStart={deselectOnCanvasComponent}
            >
              <Layer>
                {/* This is the backgound color layer and shape component */}
                <Rect width={768} height={1024} fill="white" />
              </Layer>
              <Layer>
                {/* Renders components based on what is stored in the onCanvasComponenet state object, including their positions */}
                {Object.keys(onCanvasComponents).map((CompKey) => {
                  if (
                    onCanvasComponents[CompKey].componenttype == "profileavatar"
                  ) {
                    return (
                      <ProfileAvatarComponent
                        CompKey={CompKey}
                        isSelected={selectedCanvasComponent === CompKey}
                        isTransformable={
                          selectedCanvasComponent === CompKey &&
                          scaleToggle === true
                        }
                        setSelectedCanvasComponent={setSelectedCanvasComponent}
                        onCanvasComponents={onCanvasComponents}
                        setOnConvasComponents={setOnConvasComponents}
                      />
                    );
                  }
                  if (
                    onCanvasComponents[CompKey].componenttype ==
                    "personaldetails"
                  ) {
                    return (
                      <PersonalDetailsComponent
                        CompKey={CompKey}
                        isSelected={selectedCanvasComponent === CompKey}
                        isTransformable={
                          selectedCanvasComponent === CompKey &&
                          scaleToggle === true
                        }
                        setSelectedCanvasComponent={setSelectedCanvasComponent}
                        onCanvasComponents={onCanvasComponents}
                        setOnConvasComponents={setOnConvasComponents}
                      />
                    );
                  }
                  if (
                    onCanvasComponents[CompKey].componenttype == "education"
                  ) {
                    return (
                      <EducationComponent
                        CompKey={CompKey}
                        isSelected={selectedCanvasComponent === CompKey}
                        isTransformable={
                          selectedCanvasComponent === CompKey &&
                          scaleToggle === true
                        }
                        setSelectedCanvasComponent={setSelectedCanvasComponent}
                        onCanvasComponents={onCanvasComponents}
                        setOnConvasComponents={setOnConvasComponents}
                      />
                    );
                  }
                  if (
                    onCanvasComponents[CompKey].componenttype == "experience"
                  ) {
                    return (
                      <ExperienceComponent
                        CompKey={CompKey}
                        isSelected={selectedCanvasComponent === CompKey}
                        isTransformable={
                          selectedCanvasComponent === CompKey &&
                          scaleToggle === true
                        }
                        setSelectedCanvasComponent={setSelectedCanvasComponent}
                        onCanvasComponents={onCanvasComponents}
                        setOnConvasComponents={setOnConvasComponents}
                      />
                    );
                  }
                })}
              </Layer>
            </Stage>
          </div>
        </section>
      </div>
    </>
  );
}

export default Builder;
