export default function PersonalDetails({ setPersonalInfo }) {
  const updateProfile = (e, keyname) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [keyname]: e.target.value,
    }));
  };

  return (
    <>
      {/* Player Profile Section */}
      <section>
        <div className="font-bold">Personal Info</div>
        <div className="relative">
          <input
            type="text"
            placeholder="First Name"
            onChange={(event) => updateProfile(event, "firstname")}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(event) => updateProfile(event, "lastname")}
          />
          <br />
          <input
            type="text"
            placeholder="Discord Username"
            onChange={(event) => updateProfile(event, "discordusername")}
          />
          <br />
        </div>
      </section>
    </>
  );
}
