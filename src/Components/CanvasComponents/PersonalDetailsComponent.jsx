import { Group, Rect, Text } from "react-konva";
export default function PersonalDetailsComponent({ onCanvasComponents, setOnConvasComponents}) {
    return (
        <>
                    <Group
                      width={60}
                      height={60}
                      x={onCanvasComponents.x} 
                      y={onCanvasComponents.y} 
                      onDragStart={(e) => {
                        setOnConvasComponents({
                          isDragging: true,
                          // x: e.target.x(),
                          // y: e.target.y()
                        });
                      }}
                      onDragEnd={(e) => {
                        setOnConvasComponents({
                          isDragging: false,
                          x: e.target.x(),
                          y: e.target.y()
                        });
                      }}
                      draggable
                    >
                      <Rect 
                        fill="gray"
                        stroke={onCanvasComponents.isDragging ? "green": ""} 
                        width={50} 
                        height={60} 
                      />
                      <Text 
                        text={"FirstName (Preferred Name) (Middle Intial) LastName"}
                        fill={onCanvasComponents.isDragging ? "green" : "black"}
                      />
                      <Text 
                        text={"Phone Number"}
                        fill={onCanvasComponents.isDragging ? "green" : "black"}
                        offsetY={-10}
                      />
                      <Text 
                        text={"Email Address"}
                        fill={onCanvasComponents.isDragging ? "green" : "black"}
                        offsetY={-20}
                      />
                      <Text 
                        text={"Linkedin"}
                        fill={onCanvasComponents.isDragging ? "green" : "black"}
                        offsetY={-30}
                      />
                      <Text 
                        text={"Personal Website"}
                        fill={onCanvasComponents.isDragging ? "green" : "black"}
                        offsetY={-40}
                      />
                      <Text
                        text={"Social Media"}
                        fill={onCanvasComponents.isDragging ? "green" : "black"}
                        offsetY={-50}
                      />
                    </Group>
        </>
    )
}