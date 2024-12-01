// This Experience Component contains the inputs that will affect the
// data held in the Experience state object.
// This includes: Role, Company Name, Date Span of Employment
//                Input in STAR (SITUATION, TASK, ACTION, RESULT) for each job
export default function Experience({setExperienceInfo}) {
  const updateProfile = (e, keyname) => {
    setExperienceInfo((prevState) => ({
      ...prevState,
      [keyname]: e.target.value,
    }));
  };

  return (
    <>
      <form>
        <div className="font-bold">Experience</div>
        <fieldset id="experience">
          <legend> Experience</legend>
          {/* Require at least one job experience */}
          <input
            type="text"
            placeholder="Job Position"
          />
          <input 
            type="text"
            placeholder="Company Name"
          />
          <input 
            type="text"
            placeholder="Company Location"
          />
          <select>
            <option value="">Employment Type</option>
            <option value="fulltime">Full-Time</option>
            <option value="parttime">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contracted Work</option>
          </select>
          <br />

          <label for="startdate">Start Date: </label>
          <input 
            type="date"
            placeholder="Start Date"
            id="startdate"
            name="startdate"
          />
          <label for="enddate">End Date: </label>
          <input 
            type="date"
            placeholder="End Date"
            id="enddate"
            name="enddate"
          />
          <input 
            type="checkbox"
            id="workpresentcheck"
          />
          <label for="workpresentcheck">Presently Working</label>
          <br/>

          <textarea 
            type="text"
            placeholder="Describe the Situation/Task, Action, and Result"
          />
        </fieldset>
      </form>
    </>
  );
}
