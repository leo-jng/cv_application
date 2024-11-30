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

export default function Education({ setEducationInfo }) {
  const updateProfile = (e, keyname) => {
    setEducationInfo((prevState) => ({
      ...prevState,
      [keyname]: e.target.value,
    }));
  };

  return (
    <>
      <section>
        <div className="font-bold">Education</div>
        <div className="relative">
          {/* Degree, Field of Study, Institution Name */}
          <select />
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
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            {/* The rest can wait for now */}
          </select>
          {/* ------------------------------------------------------------ */}

          {/* GPA */}
          <input type="number" placeholder="GPA" />
          {/* ------------------------------------------------------------ */}

          {/* The rest can wait, because they can be added as much as they want */}
        </div>
      </section>
    </>
  );
}
