import { Group, Rect, Text } from "react-konva";

export default function ExperienceComponent({CompKey, isSelected, setSelectedCanvasComponent, onCanvasComponents, setOnConvasComponents}) {
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
              text={onCanvasComponents[CompKey].jobposition}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
            />
            <Text 
              text={onCanvasComponents[CompKey].companyname + ", " + onCanvasComponents[CompKey].companylocation}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-10}
            />
            <Text 
                text={ onCanvasComponents[CompKey].employmenttype}
                fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
                offsetY={-20}
            />
            <Text 
                text={onCanvasComponents[CompKey].startdate + " to " + onCanvasComponents[CompKey].enddate}
                fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
                offsetY={-30}
            />
            <Text 
                text={onCanvasComponents[CompKey].jobachievement_no1}
                fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
                offsetY={-40}
            />
            <Text 
                text={onCanvasComponents[CompKey].jobachievement_no2}
                fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
                offsetY={-50}
            />
            <Text 
                text={onCanvasComponents[CompKey].jobachievement_no3}
                fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
                offsetY={-60}
            />
            <Text 
                text={onCanvasComponents[CompKey].jobachievement_no4}
                fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
                offsetY={-70}
            />
            </Group>
        </>
    )
}