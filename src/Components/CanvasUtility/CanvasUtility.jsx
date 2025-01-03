import deleteIcon from "../../assets/deleteIcon.svg";
import scaleIcon from "../../assets/scaleIcon.svg";
import textIncreaseIcon from "../../assets/textIncreaseIcon.svg";
import textDecreaseIcon from "../../assets/textDecreaseIcon.svg";
import { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";

export default function CanvasUtility({
  canvasNode,
  isSelected,
  scaleToggle,
  setScaleToggle,
  selectedCanvasComponent,
  setSelectedCanvasComponent,
  onCanvasComponents,
  setOnConvasComponents,
}) {
  const fontInputRef = useRef(null);
  const saveToPdfButtonRef = useRef(null);

  useEffect(() => {
    // listens for key presses on the fontsize input element
    console.log("useEffect for enter key listening triggered");
    const handleEnter = (event) => {
      if (event.keyCode === 13) {
        console.log("enter pressed", event.target);
        // check if input value is valid number, nonvalid inputs are returned by event as empty strings
        if (event.target.value != "") {
          setOnConvasComponents((prevState) => ({
            ...prevState,
            [selectedCanvasComponent]: {
              ...prevState[selectedCanvasComponent],
              fontsize: event.target.valueAsNumber,
            },
          }));
        } else {
          console.log("please enter a valid number!");
        }
      } else {
        console.log("a key has been pressed");
      }
    };
    if (fontInputRef.current) {
      console.log("mount listening for enter key press");
      fontInputRef.current.addEventListener("keypress", handleEnter);
    }
    return () => {
      console.log("clean up enter key press listener");
      if (fontInputRef.current) {
        fontInputRef.current.removeEventListener("keypress", handleEnter);
      }
    };
    // set dependency to selectedCanvasComponent to set eventlistener to most up to date selectedCanvasComponent
  }, [selectedCanvasComponent]);

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
    // selected onCanvasComponent will be able to use its transformer componenet attributes to update its sizing.
    // the way the transformer behaves will be different internally depending on whether the component is
    // an image (ie profile image) or if it is text (ie personal details, education, and experience).
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

  const checkCanvasSaveable =
    // checks if the canvas can be saved to pdf with the 2 conditions:
    // 1) there are components placed on the canvas
    // 2) the canvasNode reference has updated reference the Stage Node
    //    (CanvasUtility acknolwedges this on the render after the initial render
    //    bc the update takes place in a component below the Canvas Utility component)
    Object.keys(onCanvasComponents).length != 0 && canvasNode != null
      ? true
      : false;

  useEffect(() => {
    // the Node.toImage is an async function, so it is safer to wrap it into a useEffect
    console.log("canvas stage reference useEffect triggered");
    const saveCanvasToPdf = () => {
      console.log("saveCanvasToPdf clicked");
      canvasNode.toImage({
        callback: function (image) {
          // console.log("canvas ref", canvasNode);
          console.log("Image Retrieved", image, image.src);
          const pdfDoc = new jsPDF();
          pdfDoc.addImage(
            image.src,
            "PNG",
            0,
            0
            // 50,
            // 50
            // canvasNode.attrs.width,
            // canvasNode.attrs.height
          );
          pdfDoc.save("testsave.pdf");
        },
        // x: 0,
        // y: 0,
        // width: canvasNode.attrs.width,
        // height: canvasNode.attrs.height,
      });
    };

    if (canvasNode != null && saveToPdfButtonRef.current != null) {
      console.log("mounted saveCanvasToPdf to button");
      saveToPdfButtonRef.current.addEventListener("click", saveCanvasToPdf);
    }
    console.log("----------------------------");
    return () => {
      if (canvasNode != null && saveToPdfButtonRef.current != null) {
        console.log("unmounted saveCanvasToPdf button");
        saveToPdfButtonRef.current.removeEventListener(
          "click",
          saveCanvasToPdf
        );
      }
    };
  }, [canvasNode, saveToPdfButtonRef]);

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
          <img src={deleteIcon} alt="delete component" />
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
          <img src={scaleIcon} alt="scale component" />
        </button>

        <input
          type="number"
          step="1"
          className="w-[125px]"
          ref={fontInputRef}
          placeholder={
            isSelected &&
            onCanvasComponents[selectedCanvasComponent].componenttype !=
              "profileavatar"
              ? onCanvasComponents[selectedCanvasComponent].fontsize
              : "Not Applicable"
          }
          // should be disabled if the selected component is an image
          disabled={
            isSelected &&
            onCanvasComponents[selectedCanvasComponent].componenttype !=
              "profileavatar"
              ? false
              : true
          }
        />
        <label>px</label>
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
          <img src={textIncreaseIcon} alt="increase component font size" />
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
          <img src={textDecreaseIcon} alt="decrease component font size" />
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
        <button
          ref={saveToPdfButtonRef}
          // disable the button if canvasNode Ref (Stage Element) is null and there are elements on canvas
          disabled={checkCanvasSaveable == false ? true : false}
          className={
            checkCanvasSaveable == true
              ? "bg-green-700"
              : "bg-slate-900  text-slate-500 hover:border-slate-900"
          }
        >
          Save as PDF
        </button>
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
      <div>
        <label htmlFor="current_font"> Current Font: </label>
        <div id="current_font" className={`font-[${currentSelectedFont}]`}>
          {" "}
          {currentSelectedFont}{" "}
        </div>
        <label htmlFor="font_selection"> Change Font Style: </label>
        <select
          id="font_selection"
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
      </div>
    </>
  );
};
