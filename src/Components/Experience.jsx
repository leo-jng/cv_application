// This Experience Component contains the inputs that will affect the
// data held in the Experience state object.
// This includes: Role, Company Name, Date Span of Employment
//                Input in STAR (SITUATION, TASK, ACTION, RESULT) for each job

// Feature to implement later: add and delete experiences
export default function Experience({
  ExpKey,
  ComponentEditStatus,
  experienceInfoList,
  setExperienceInfoList,
  onCanvasComponents,
  setOnConvasComponents,
  generateRandomKey,
}) {
  const saveExperienceInfoList = (e) => {
    e.preventDefault();
    console.log(
      "current experience component saved",
      e.target[1].value,
      e.target[2].value,
      e.target[3].value,
      e.target[4].value,
      e.target[5].value,
      e.target[6].value,
      e.target[7].value,
      ":",
      e.target[7].checked,
      e.target[8].value,
      e.target[9].value,
      e.target[10].value
    );
    setExperienceInfoList((prevState) => ({
      ...prevState,
      [ExpKey]: {
        ["jobposition"]: e.target[1].value,
        ["companyname"]: e.target[2].value,
        ["companylocation"]: e.target[3].value,
        ["employmenttype"]: e.target[4].value,
        ["startdate"]: e.target[5].value,
        // e.target[7] is the checkbox indicating whether or not the current work is current job
        ["enddate"]:
          e.target[7].checked == true ? "workpresent" : e.target[6].value,
        // ["workpresentcheck"]: e.target[7].value,
        ["jobachievement_no1"]: e.target[8].value,
        ["jobachievement_no2"]: e.target[9].value,
        ["jobachievement_no3"]: e.target[10].value,
        ["jobachievement_no4"]: e.target[11].value,
        ["editstatus"]: false,
      },
    }));
  };

  const editExperienceInfoList = () => {
    console.log(
      "edit button clicked!",
      "editstatus for experienne info ",
      ExpKey,
      "set to: ",
      !ComponentEditStatus
    );
    setExperienceInfoList((prevState) => ({
      ...prevState,
      [ExpKey]: {
        ...prevState[ExpKey],
        ["editstatus"]: !ComponentEditStatus, // this will indicate that the current componet is saved, and no further editing is allowed
      },
    }));
  };

  const deleteFromExperienceInfoList = () => {
    console.log("delete button clicked for ", ExpKey);
    // the spread operator creates shallow copies,
    // so when the delete happens, it still directly changes the nested objects within the state object
    // let copyState = {...experienceInfoList};
    let copyState = JSON.parse(JSON.stringify(experienceInfoList));
    delete copyState[ExpKey];
    setExperienceInfoList(copyState);
  };

  const addComponentToCanvas = () => {
    console.log("add experience component ", ExpKey, " to canvas");
    const CompKey = generateRandomKey(onCanvasComponents);
    const CopyExperience = { ...experienceInfoList[ExpKey] };
    setOnConvasComponents((prevState) => ({
      ...prevState,
      [CompKey]: {
        componenttype: "experience",
        isDragging: false,
        x: 20,
        y: 20,
        fontsize: 12, //reactkonva text component takas number for fontsize attribute
        fontfamily: "Arial",
        jobposition: CopyExperience["jobposition"],
        companyname: CopyExperience["companyname"],
        companylocation: CopyExperience["companylocation"],
        employmenttype: CopyExperience["employmenttype"],
        startdate: CopyExperience["startdate"],
        enddate: CopyExperience["enddate"],
        jobachievement_no1: CopyExperience["jobachievement_no1"],
        jobachievement_no2: CopyExperience["jobachievement_no2"],
        jobachievement_no3: CopyExperience["jobachievement_no3"],
        jobachievement_no4: CopyExperience["jobachievement_no4"],
      },
    }));
  };

  return (
    <>
      <section className="bg-gray-800 border w-2/3">
        <form
          onSubmit={(e) => saveExperienceInfoList(e)}
          id={"experienceinfoform_" + ExpKey}
        >
          <div className="font-bold">Experience</div>
          <fieldset
            id="experience"
            disabled={ComponentEditStatus == true ? false : true} // disables form inputs if editstatus is false, enables if editstatus is true
          >
            {/* <legend for="experience"> Experience</legend> */}
            {/* Require at least one job experience */}
            <input type="text" placeholder="Job Position" />
            <input type="text" placeholder="Company Name" />
            <input type="text" placeholder="Company Location" />
            <select defaultValue={""}>
              <option value="" disabled>
                Employment Type
              </option>
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
            />
            <label htmlFor="enddate">End Date: </label>
            <input
              type="date"
              placeholder="End Date"
              id="enddate"
              name="enddate"
            />
            <input
              type="checkbox"
              value="workpresent"
              id="workpresentcheck"
              name="workpresentcheck"
            />
            <label htmlFor="workpresentcheck">Presently Working</label>
            <br />

            <label htmlFor="achievementtext1">Achievement 1</label>
            <textarea
              type="text"
              id="achievementtext1"
              placeholder="Describe the Situation/Task, Action, and Result"
            />
            <br />
            <label htmlFor="achievementtext2">Achievement 2</label>
            <textarea
              type="text"
              id="achievementtext2"
              placeholder="Describe the Situation/Task, Action, and Result"
            />
            <br />
            <label htmlFor="achievementtext3">Achievement 3</label>
            <textarea
              type="text"
              id="achievementtext3"
              placeholder="Describe the Situation/Task, Action, and Result"
            />
            <br />
            <label htmlFor="achievementtext4">Achievement 4</label>
            <textarea
              type="text"
              id="achievementtext4"
              placeholder="Describe the Situation/Task, Action, and Result"
            />
          </fieldset>
        </form>
        <button
          type="submit"
          form={"experienceinfoform_" + ExpKey}
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
          onClick={editExperienceInfoList}
          className={
            ComponentEditStatus == true
              ? "bg-slate-900  text-slate-500 hover:border-slate-900"
              : "bg-green-700"
          }
          disabled={ComponentEditStatus == true ? true : false}
        >
          Edit
        </button>

        <button onClick={deleteFromExperienceInfoList}>Delete</button>

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
      </section>
    </>
  );
}
