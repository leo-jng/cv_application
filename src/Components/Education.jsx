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

export default function Education({ setEducationInfo, o1}) { //o1 is just educationinfo object, added for test purposes
  const updateProfile = (e, keyname) => {
    setEducationInfo((prevState) => ({
      ...prevState,
      [keyname]: e.target.value,
    }));
    console.log(o1);
  };

  const populateYearsOption = function() {
    let optionArray = [];
    for (let yearOption = 1900; yearOption <= 2100; yearOption++){
      optionArray.push(<option key={`${yearOption}`} value={`${yearOption}`}> {yearOption} </option>)
    }
    return (
      <>
      {optionArray}
      </>
    )
  }

  return (
    <>
      <section>
        <div className="font-bold">Education</div>
        <div className="relative">
          {/* Degree, Major, Institution Name */}
          <select onChange={(event) => updateProfile(event, "degree")} required>
            <option value="" disabled selected>Select a Degree</option>
            <option value="associate">Associate</option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
            <option value="doctorate">Doctorate</option>
          </select>
          <input
            type="text"
            placeholder="Field of Study or Major"
            onChange={(event) => updateProfile(event, "major")}
            required
          />
          <input
            type="text"
            placeholder="Institution Name"
            onChange={(event) => updateProfile(event, "institution")}
            required
          />
          {/* ------------------------------------------------------------ */}

          {/* Graduation Month and Year */}
          <select
            id="Month"
            onChange={(event) => updateProfile(event, "graduationmonth")}
            required
          >
            <option value="" disabled selected>
              Select Month of Graduation
            </option>
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
            onChange={(event) => updateProfile(event, "graduationyear")}
            required
          >
            <option value="" disabled selected>
              Select Year of Graduation
            </option>
            {populateYearsOption()}
          </select>
          {/* ------------------------------------------------------------ */}

          {/* GPA */}
          <input type="number" step=".01" placeholder="GPA (Optional)" onChange={(event) => updateProfile(event, "gpa")}/>
          {/* ------------------------------------------------------------ */}
        </div>
      </section>
    </>
  );
}
