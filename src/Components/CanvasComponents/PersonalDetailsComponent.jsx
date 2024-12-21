import { Group, Rect, Text } from "react-konva";
export default function PersonalDetailsComponent({ CompKey, onCanvasComponents, setOnConvasComponents }) {
  const onCanvasName = (onCanvasComponents[CompKey].firstname + " " + 
    (onCanvasComponents[CompKey].preferredname != "" ? "(" + onCanvasComponents[CompKey].preferredname + ") " : "") +
    (onCanvasComponents[CompKey].middlename != "" ? onCanvasComponents[CompKey].middlename + " ": "") +
    onCanvasComponents[CompKey].lastname);

  const onCanvasSuffix = (onCanvasComponents[CompKey].suffix != "" ? " " + onCanvasComponents[CompKey] : "")

  const onCanvasPhoneNumber = ("(" + onCanvasComponents[CompKey].phonenumber.substring(0, 3) + ")" + "-" + onCanvasComponents[CompKey].phonenumber.substring(3, 6) + "-" + onCanvasComponents[CompKey].phonenumber.substring(6))
  
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
              text={onCanvasName + onCanvasSuffix}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
            />
            <Text 
              text={onCanvasPhoneNumber}
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
              text={onCanvasComponents[CompKey].github}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-50}
            />
            <Text
              text={onCanvasComponents[CompKey].facebook}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-60}
            />
            <Text
              text={onCanvasComponents[CompKey].instagram}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-70}
            />
            <Text
              text={onCanvasComponents[CompKey].twitter}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-80}
            />
            <Text
              text={onCanvasComponents[CompKey].bluesky}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-90}
            />
            <Text
              text={onCanvasComponents[CompKey].other}
              fill={onCanvasComponents[CompKey].isDragging ? "green" : "black"}
              offsetY={-100}
            />
          </Group>
        </>
    )
}