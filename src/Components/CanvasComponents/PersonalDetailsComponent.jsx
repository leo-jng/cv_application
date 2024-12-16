import { Group, Rect, Text } from "react-konva";
export default function PersonalDetailsComponent({ CompKey, onCanvasComponents, setOnConvasComponents }) {
    return (
        <>
          <Group
            width={60}
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
              text={onCanvasComponents[CompKey].firstname + " " + onCanvasComponents[CompKey].lastname}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
            />
            <Text 
              text={onCanvasComponents[CompKey].phonenumber}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-10}
            />
            <Text 
              text={onCanvasComponents[CompKey].emailaddress}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-20}
            />
            <Text 
              text={onCanvasComponents[CompKey].linkedin}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-30}
            />
            <Text 
              text={onCanvasComponents[CompKey].personalwebsite}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-40}
            />
            <Text
              text={"Social Media"}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-50}
            />
          </Group>
        </>
    )
}