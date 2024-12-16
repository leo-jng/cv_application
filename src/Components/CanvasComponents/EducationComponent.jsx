import { Group, Rect, Text } from "react-konva";

export default function EducationComponent({CompKey, onCanvasComponents, setOnConvasComponents}) {
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
              text={onCanvasComponents[CompKey].degree + " " + onCanvasComponents[CompKey].major}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
            />
            <Text 
              text={onCanvasComponents[CompKey].institution}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-10}
            />
            <Text 
                text={"Graduated in " + onCanvasComponents[CompKey].graduationmonth + " " + onCanvasComponents[CompKey].graduationyear}
                fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
                offsetY={-20}
            />
            </Group>
        </>
    )
}