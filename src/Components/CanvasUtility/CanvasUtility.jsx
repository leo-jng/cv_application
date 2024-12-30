export default function CanvasUtility({
  isSelected,
  scaleToggle,
  setScaleToggle,
  selectedCanvasComponent,
  setSelectedCanvasComponent,
  onCanvasComponents,
  setOnConvasComponents,
}) {
  const deleteSelectedComponent = () => {
    // when delete is pressed, the currently selected onCanvasComponent will be removed from the onCanvasComponents state object
    console.log(
      "deleting current selected onCanvasComponent at ",
      selectedCanvasComponent
    );
    const copyState = JSON.parse(JSON.stringify(onCanvasComponents));
    delete copyState[selectedCanvasComponent];
    // setOnConvasComponents // slight typo with Convas instead of Canvas, causing function-missing issues
    setOnConvasComponents(copyState);
    setSelectedCanvasComponent(null);
  };

  const toggleScaleSelectedComponent = () => {
    // scaling is not a one stop shop, its a toggle for an enduring occurrence until the the user wants to stop.
    // Thus, the selected component should have a built in onTransform attribute just like onDrag, but it only
    // activates when the 'scale' button is clicked to enable.
    // this also means that the scaling values have to persist, so they have to be saved into the component attribute

    // therefore, when scale is pressed, the scale feature will be toggled (need a state for that), and the currently
    // selected onCanvsComponent will be able to use its onTransform attributes to update its sizing
    console.log("scaling toggled to ", !scaleToggle);
    setScaleToggle(!scaleToggle);
  };

  const increaseFontSize = () => {
    console.log("Increase font size clicked");
    const uppedFontSize =
      onCanvasComponents[selectedCanvasComponent].fontsize + 1;
    setOnConvasComponents((prevState) => ({
      ...prevState,
      [selectedCanvasComponent]: {
        ...prevState[selectedCanvasComponent],
        fontsize: uppedFontSize,
      },
    }));
  };

  const decreaseFontSize = () => {
    console.log("Decrease font size clicked!");
    const downedFontSize =
      onCanvasComponents[selectedCanvasComponent].fontsize - 1;
    setOnConvasComponents((prevState) => ({
      ...prevState,
      [selectedCanvasComponent]: {
        ...prevState[selectedCanvasComponent],
        fontsize: downedFontSize,
      },
    }));
  };

  const changeFontStyle = (event) => {
    // event.preventDefault();
    console.log(
      "font style change has been clicked to change to: ",
      event.target.value
    );
    setOnConvasComponents((prevState) => ({
      ...prevState,
      [selectedCanvasComponent]: {
        ...prevState[selectedCanvasComponent],
        fontfamily: event.target.value,
      },
    }));
  };

  // const saveCanvasToPdf = () => {
  // reactKonva requires that the canvas be converted to an image first, then saved as a pdf via jsPDF library.
  // we can make the text selectable by creating hidden text underneath an image, such that
  // while it is not visible, it is still selectable
  // };
  return (
    <>
      <div id="utilitybar">
        {/* erase and scale will be active only when a onCanvasComponent is selected */}
        <button
          onClick={deleteSelectedComponent}
          className={
            isSelected
              ? "bg-green-700"
              : "bg-slate-900  text-slate-500 hover:border-slate-900"
          }
          disabled={isSelected ? false : true}
        >
          Erase
        </button>
        <button
          onClick={toggleScaleSelectedComponent}
          className={
            isSelected
              ? scaleToggle
                ? "bg-blue-400"
                : "bg-green-700"
              : "bg-slate-900  text-slate-500 hover:border-slate-900"
          }
          disabled={isSelected ? false : true}
        >
          Scale Text Window
        </button>
        <button
          onClick={increaseFontSize}
          className={
            isSelected &&
            onCanvasComponents[selectedCanvasComponent].componenttype !=
              "profileavatar"
              ? "bg-green-700"
              : "bg-slate-900  text-slate-500 hover:border-slate-900"
          }
          // should be disabled if the selected component is an image
          disabled={
            isSelected &&
            onCanvasComponents[selectedCanvasComponent].componenttype !=
              "profileavatar"
              ? false
              : true
          }
        >
          Increase Fontsize
        </button>
        <button
          onClick={decreaseFontSize}
          className={
            isSelected &&
            onCanvasComponents[selectedCanvasComponent].componenttype !=
              "profileavatar"
              ? "bg-green-700"
              : "bg-slate-900  text-slate-500 hover:border-slate-900"
          }
          // should be disabled if the selected component is an image
          disabled={
            isSelected &&
            onCanvasComponents[selectedCanvasComponent].componenttype !=
              "profileavatar"
              ? false
              : true
          }
        >
          Decrease Fontsize
        </button>
        <FontStyleOptions
          disableSelection={
            isSelected &&
            onCanvasComponents[selectedCanvasComponent].componenttype !=
              "profileavatar"
              ? false
              : true
          }
          changeFontStyle={changeFontStyle}
          onCanvasComponents={onCanvasComponents}
          selectedCanvasComponent={selectedCanvasComponent}
        />
        <button>Save as PDF</button>
      </div>
    </>
  );
}

const FontStyleOptions = ({
  disableSelection,
  changeFontStyle,
  onCanvasComponents,
  selectedCanvasComponent,
}) => {
  const currentSelectedFont =
    selectedCanvasComponent == null ||
    onCanvasComponents[selectedCanvasComponent].componenttype == "profileavatar"
      ? "Not Applicable"
      : onCanvasComponents[selectedCanvasComponent].fontfamily;
  return (
    <>
      <div> Current Font: {currentSelectedFont} </div>
      <label> Change Font Style: </label>
      <select
        defaultValue={""}
        onChange={(event) => changeFontStyle(event)}
        disabled={disableSelection}
      >
        <option value="" disabled>
          {currentSelectedFont}
        </option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
      </select>
    </>
  );
};
