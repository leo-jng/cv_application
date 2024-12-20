// This Education Component contains the inputs that will affect the
// data held in the Education state object.
// This includes: Degree (Bachelors, Masters, Phd, etc)
//                Field of Study or Major
//                Institution Name
//                Graduation Date or Expected Graduation Date (Month, Year)
//                GPA (Optional)
//                Distinctions and Awards (Semester and Year)
//                Certifications (Month and Year)
//                Relevant Coursework

export default function Education({ ComponentEditStatus, setEducationInfo, educationInfo,
  setOnConvasComponents, generateRandomKey
}) { //o1 is just educationinfo object, added for test purposes
  // const updateProfile = (e, keyname) => {
  //   setEducationInfo((prevState) => ({
  //     ...prevState,
  //     [keyname]: e.target.value,
  //   }));
  // };

  const populateYearsOption = function() {
    let optionArray = [];
    for (let yearOption = 1900; yearOption <= 2100; yearOption++){
      optionArray.push(<option key={`${yearOption}`} value={`${yearOption}`}> {yearOption} </option>)
    }
    return (
      <>
      <option value="" disabled> Select Year of Graduation </option>
      {optionArray}
      </>
    )
  }

  const saveEducationInfo = (e) => {
    e.preventDefault();
    // Clicking this button should run through the form and save all the inputs into state object;
    console.log(
      "education info saved",
      e.target[1].value, // degree
      e.target[2].value, // major
      e.target[3].value, // college
      e.target[4].value, // grad month
      e.target[5].value, // grad year
      e.target[6].value  // gpa
    ); 

    setEducationInfo((prevState) => ({
      ...prevState,
      // e.target[0] of the form is fieldset, so first input actually start at 1
      ["degree"]: e.target[1].value,
      ["major"]: e.target[2].value,
      ["institution"]: e.target[3].value,
      ["graduationmonth"]: e.target[4].value,
      ["graduationyear"]: e.target[5].value,
      ["gpa"]: e.target[6].value,
      ["editstatus"]: false, // this will indicate that the current componet is saved, and no further editing is allowed
    }));

    // after saving, the component will be completely greyed out


  }

  const editEducationInfo = () => {
    // Do something to allow editing and cancel editing.
    console.log("edit button clicked!", "editstatus for education set to: ", !ComponentEditStatus)
    setEducationInfo((prevState) => ({
      ...prevState,
      ["editstatus"]: (!ComponentEditStatus), // this will indicate that the current componet is saved, and no further editing is allowed
    }));
    // Current idea is to use a boolean value to dictate edicability of form inputs.
    // Each input would checkin with a global boolean value to see if they can be changed.
    // Cancelling edit should revert to previous saved input
    // edit should check if the inputs are on default before. 
  }

  const addComponentToCanvas = () => {
    console.log("add education component to canvas");
    const CompKey = generateRandomKey();
    const CopyEducation = {...educationInfo};
    setOnConvasComponents((prevState) => ({
      ...prevState,
      [CompKey] : {
        componenttype: "education",
        isDragging: false,
        x: 20,
        y: 20,
        degree: CopyEducation["degree"],
        major: CopyEducation["major"],
        institution: CopyEducation["institution"],
        graduationmonth: CopyEducation["graduationmonth"],
        graduationyear: CopyEducation["graduationyear"],
        gpa: CopyEducation["gpa"],
      } 
    }))
  }

  return (
    <>
      <section className="bg-gray-800 border w-1/2">
      <form onSubmit={(e) => saveEducationInfo(e)} id="educationform">
        <div className="font-bold">Education</div>
        <fieldset 
          className="relative" 
          disabled={ComponentEditStatus == true ? false : true} // disables form inputs if editstatus is false, enables if editstatus is true
        >
          {/* Degree, Major, Institution Name */}
          <select 
            defaultValue={""} 
          // onChange={(event) => updateProfile(event, "degree")} 
            // disabled={ComponentEditStatus}
            required
          >
            <option value="" disabled >Select a Degree</option>
            <option value="associate">Associate</option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
            <option value="doctorate">Doctorate</option>
          </select>

          <input
            type="text"
            placeholder="Field of Study or Major"
            // onChange={(event) => updateProfile(event, "major")}
            required
          />

          <input
            type="text"
            placeholder="Institution Name"
            // onChange={(event) => updateProfile(event, "institution")}
            required
          />

          {/* ------------------------------------------------------------ */}

          {/* Graduation Month and Year */}
          <select
            id="Month"
            defaultValue={""}
            // onChange={(event) => updateProfile(event, "graduationmonth")}
            required
          >
            <option value="" disabled>Select Month of Graduation</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">Aug</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>

          <select
            id="Year"
            defaultValue={""}
            // onChange={(event) => updateProfile(event, "graduationyear")}
            required
          >
            {/* <option value="" disabled> Select Year of Graduation </option> */}
            {populateYearsOption()}
          </select>

          {/* ------------------------------------------------------------ */}

          {/* GPA */}

          <input 
            type="number" 
            step=".01" 
            placeholder="GPA (Optional)" 
            // onChange={(event) => updateProfile(event, "gpa")}
          />

          {/* ------------------------------------------------------------ */}
        </fieldset>
        <button 
          type="submit" 
          form="educationform"
          className={ComponentEditStatus == true ? "bg-green-700" : "bg-slate-900 text-slate-500 hover:border-slate-900"}
          disabled={ComponentEditStatus == true ? false : true}
        >
          Save
        </button>
        <button type="button" 
          onClick={editEducationInfo}
          className={ComponentEditStatus == true ? "bg-slate-900  text-slate-500 hover:border-slate-900" : "bg-green-700"}
          disabled={ComponentEditStatus == true ? true : false}
        > Edit
        </button>
        {/* don't use onClick={editEducationInfo()}, the () makes it execute immediately onload instead of running specificly via onclick*/}
        {/* edit button has to be de-tached from the form itself or the submit button won't work bc the onClick overrices it. */}
        {/* edit button would be greyed out until save is pressed. */}
        <button type="button"
          onClick={addComponentToCanvas}
          className={ComponentEditStatus == true ? "bg-slate-900  text-slate-500 hover:border-slate-900" : "bg-green-700"}
          disabled={ComponentEditStatus == true ? true : false}
        >Render</button>
        </form>
      </section>
    </>
  );
}
