
export default function CanvasUtility({isSelected, scaleToggle, setScaleToggle, selectedCanvasComponent, setSelectedCanvasComponent, onCanvasComponents, setOnConvasComponents}) {
    const deleteSelectedComponent = () => {
      // when delete is pressed, the currently selected onCanvasComponent will be removed from the onCanvasComponents state object
        console.log("deleting current selected onCanvasComponent at ", selectedCanvasComponent)
        const copyState = JSON.parse(JSON.stringify(onCanvasComponents))
        delete copyState[selectedCanvasComponent];
        // setOnConvasComponents // slight typo with Convas instead of Canvas, causing function-missing issues
        setOnConvasComponents(copyState);
        setSelectedCanvasComponent(null);
    }

    const toggleScaleSelectedComponent = () => {
      // scaling is not a one stop shop, its a toggle for an enduring occurrence until the the user wants to stop.
      // Thus, the selected component should have a built in onTransform attribute just like onDrag, but it only 
      // activates when the 'scale' button is clicked to enable.
      // this also means that the scaling values have to persist, so they have to be saved into the component attribute

      // therefore, when scale is pressed, the scale feature will be toggled (need a state for that), and the currently 
      // selected onCanvsComponent will be able to use its onTransform attributes to update its sizing
      console.log("scaling toggled to ", !scaleToggle);
      setScaleToggle(!scaleToggle);

    }
    const saveCanvasToPdf = () => {
        // reactKonva requires that the canvas be converted to an image first, then saved as a pdf via jsPDF library.
        // we can make the text selectable by creating hidden text underneath an image, such that 
        // while it is not visible, it is still selectable
    }
    return (
        <>
        <div id="utilitybar">
          {/* erase and scale will be active only when a onCanvasComponent is selected */}
          <button 
            onClick={deleteSelectedComponent}
            className={isSelected ? "bg-green-700" : "bg-slate-900  text-slate-500 hover:border-slate-900"}
            disabled={isSelected ? false : true}
          >Erase</button> 
          <button 
            onClick={toggleScaleSelectedComponent}
            className={isSelected ? (scaleToggle ? "bg-blue-400" : "bg-green-700") : "bg-slate-900  text-slate-500 hover:border-slate-900"}
            disabled={isSelected ? false : true}
          >Scale</button>
          {/* <button>Background1</button>
          <button>Background2</button>
          <button>Background3</button> */}
          <button>Save as PDF</button>
        </div>
        </>
    )
}