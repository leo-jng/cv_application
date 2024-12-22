import { Group, Rect, Text } from "react-konva";

export default function EducationComponent({CompKey, isSelected, setSelectedCanvasComponent, onCanvasComponents, setOnConvasComponents}) {
    const selectCurrentComponent = () => {
        console.log("this component is now selected")
        setSelectedCanvasComponent(CompKey)
    }
    
    return (
        <>
            <Group
                onClick={selectCurrentComponent}
                onTap={selectCurrentComponent}
                // height={60}
                x={onCanvasComponents[CompKey].x} 
                y={onCanvasComponents[CompKey].y} 
                onDragStart={() => {
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
                draggable={isSelected ? true :  false}
            >
            <Rect 
              // fill="gray"
              // this is the select border
              stroke={isSelected ? "green": ""} 
              width={70} 
              height={80} 
            />
            <Rect 
              fill="gray"
              width={50} 
              height={60} 
            />
            <Text 
              text={onCanvasComponents[CompKey].degree + " " + onCanvasComponents[CompKey].major}
              fontSize={onCanvasComponents[CompKey].fontsize}
            />
            <Text 
              text={onCanvasComponents[CompKey].institution}
              fontSize={onCanvasComponents[CompKey].fontsize}
              offsetY={-10}
            />
            <Text 
                text={"Graduated in " + onCanvasComponents[CompKey].graduationmonth + " " + onCanvasComponents[CompKey].graduationyear}
                fontSize={onCanvasComponents[CompKey].fontsize}
                offsetY={-20}
            />
            </Group>
        </>
    )
}