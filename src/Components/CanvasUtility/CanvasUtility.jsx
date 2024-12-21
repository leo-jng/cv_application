
export default function CanvasUtility({isSelected, selectedCanvasComponent, setSelectedCanvasComponent, onCanvasComponents, setOnConvasComponents}) {
    const deleteSelectedComponent = () => {
        console.log("deleting current selected onCanvasComponent at ", selectedCanvasComponent)
        const copyState = JSON.parse(JSON.stringify(onCanvasComponents))
        delete copyState[selectedCanvasComponent];
        // setOnConvasComponents // slight typo with Convas instead of Canvas, causing function-missing issues
        setOnConvasComponents(copyState);
        setSelectedCanvasComponent(null);
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
            className={isSelected ? "bg-green-700" : "bg-slate-900  text-slate-500 hover:border-slate-900"}
            disabled={isSelected ? false : true}
          >Scale</button>
          <button>Background1</button>
          <button>Background2</button>
          <button>Background3</button>
          <button>Save as PDF</button>
        </div>
        </>
    )
}