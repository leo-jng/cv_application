import { Group, Image, Rect } from "react-konva"
// import useImage from 
export default function ProfileAvatarComponent({ CompKey, onCanvasComponents, setOnConvasComponents}) {
    
    const [image] = useImage
    return (
        <>
            <Group
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
                           ...prevState[CompKey],                               isDragging: false,
                            x: e.target.x(),
                           y: e.target.y()  
                        }
                    }));
                }}
               draggable
            >
                <Rect 
                fill="red"
                stroke={onCanvasComponents[CompKey].isDragging ? "green": ""} 
                width={50} 
                height={60} 
                />
                <Image
                image={new window.Image(onCanvasComponents[CompKey].image)}
                />
            </Group>

        </>
    )
}