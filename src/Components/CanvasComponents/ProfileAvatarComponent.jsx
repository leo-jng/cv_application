import { Group, Image, Rect } from "react-konva"
// import useImage from 
export default function ProfileAvatarComponent({ CompKey, isSelected, setSelectedCanvasComponent, onCanvasComponents, setOnConvasComponents}) {
    
    const selectCurrentComponent = () => {
        console.log("this component is now selected")
        setSelectedCanvasComponent(CompKey)
    }

    // this function is no longer used, it is replaced by a similar function in CanvasUtility
    // const deleteFromOnCanvasComponents = () => {
    //     let copyState = {...onCanvasComponents};
    //     delete copyState[CompKey];
    //     setOnConvasComponents(copyState);
    // }
    return (
        <>
            <Group
                onClick={selectCurrentComponent}
                onTap={selectCurrentComponent}
                
                x={onCanvasComponents[CompKey].x}
                y={onCanvasComponents[CompKey].y}
                onDragStart={() => {
                    console.log("dragging image")
                    setOnConvasComponents((prevState) => ({
                        ...prevState,
                            [CompKey]: {
                               ...prevState[CompKey],
                               isDragging: true,
                           }
                       }));
                   }}
                onDragEnd={(e) => {
                    setOnConvasComponents((prevState) => ({
                       ...prevState,
                       [CompKey]: {
                        ...prevState[CompKey],                               
                        isDragging: false,
                        x: e.target.x(),
                        y: e.target.y()  
                        }
                    }));
                }}
                draggable={isSelected ? true : false}
            >
                <Rect 
                    // fill="gray"
                    // this is the select border
                    stroke={isSelected ? "green": ""} 
                    width={150} 
                    height={150} 
                />

                <Group
                    clipFunc={(ctx) => {
                        // based on:  https://stackoverflow.com/questions/66632666/circular-cropping-of-image-in-konvajs
                        ctx.arc(75, 75, 75, 0, Math.PI * 2, false);
                    }}
                >
                    <Image
                        image={onCanvasComponents[CompKey].image}
                        width={150}
                        height={150}
                    // style={}
                    /> 
                </Group>

            </Group>

        </>
    )
}