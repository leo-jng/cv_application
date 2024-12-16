import { Group, Rect, Text } from "react-konva";

export default function ExperienceComponent({CompKey, onCanvasComponents, setOnConvasComponents}) {
    return (
        <>
            <Group
                height={60}
                x={onCanvasComponents[CompKey].x} 
                y={onCanvasComponents[CompKey].y} 
                onDragStart={(e) => {
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
                draggable
            >
            <Rect 
              fill="gray"
              stroke={onCanvasComponents[CompKey].isDragging ? "green": ""} 
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