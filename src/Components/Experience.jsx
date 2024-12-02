// This Experience Component contains the inputs that will affect the
// data held in the Experience state object.
// This includes: Role, Company Name, Date Span of Employment
//                Input in STAR (SITUATION, TASK, ACTION, RESULT) for each job

// Feature to implement later: add and delete experiences
export default function Experience({setExperienceInfo}) {
  const updateProfile = (e, keyname) => {
    setExperienceInfo((prevState) => ({
      ...prevState,
      [keyname]: e.target.value,
    }));
  };

  const updateJobAchievement = (e, pointname) => {
    setExperienceInfo((prevState) => ({
      ...prevState,
      jobachievement : {
        ...prevState.jobachievement,
        [pointname]: e.target.value,
      }
    }))
  }

  return (
    <>
      <form>
        <div className="font-bold">Experience</div>
        <fieldset id="experience">
          {/* <legend for="experience"> Experience</legend> */}
          {/* Require at least one job experience */}
          <input
            type="text"
            placeholder="Job Position"
            onChange={(event) => updateProfile(event, "jobposition")}
          />
          <input 
            type="text"
            placeholder="Company Name"
            onChange={(event) => updateProfile(event, "companyname")}
          />
          <input 
            type="text"
            placeholder="Company Location"
            onChange={(event) => updateProfile(event, "companylocation")}
          />
          <select defaultValue={""} onChange={(event) => updateProfile(event, "employmenttype")}>
            <option value="" disabled >Employment Type</option>
            <option value="fulltime">Full-Time</option>
            <option value="parttime">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contracted Work</option>
          </select>
          <br />

          <label htmlFor="startdate">Start Date: </label>
          <input 
            type="date"
            placeholder="Start Date"
            id="startdate"
            name="startdate"
            onChange={(event) => updateProfile(event, "startdate")}
          />
          <label htmlFor="enddate">End Date: </label>
          <input 
            type="date"
            placeholder="End Date"
            id="enddate"
            name="enddate"
            onChange={(event) => updateProfile(event, "enddate")}
          />
          <input 
            type="checkbox"
            value="workpresent"
            id="workpresentcheck"
            name="workpresentcheck"
            onChange={(event) => updateProfile(event, "enddate")}

          />
          <label htmlFor="workpresentcheck">Presently Working</label>
          <br/>
          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateProfile(event, "jobachievement_no1")}
          />
          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateProfile(event, "jobachievement_no2")}
          />
          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateProfile(event, "jobachievement_no3")}
          />
          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateProfile(event, "jobachievement_no4")}
          />

          {/* <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateJobAchievement(event, "point1")}
          />
          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateJobAchievement(event, "point2")}
          />
          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateJobAchievement(event, "point3")}
          />
          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
            onChange={(event) => updateJobAchievement(event, "point4")}
          /> */}
        </fieldset>
      </form>
    </>
  );
}
