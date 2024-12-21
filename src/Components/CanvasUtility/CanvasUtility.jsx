
export default function CanvasUtility({isSelected}) {
    return (
        <>
        <div id="utilitybar">
          {/* erase and scale will be active only when a onCanvasComponent is selected */}
          <button 
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