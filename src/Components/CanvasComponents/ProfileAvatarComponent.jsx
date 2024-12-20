import { Group, Image, Rect } from "react-konva"
// import useImage from 
export default function ProfileAvatarComponent({ CompKey, onCanvasComponents, setOnConvasComponents}) {
    
    // const [image] = useImage
    const deleteFromOnCanvasComponents = () => {
        let copyState = {...onCanvasComponents};
        delete copyState[CompKey];
        setOnConvasComponents(copyState);
    }
    return (
        <>
            <Group
                clipFunc={(ctx) => {
                    // based on:  https://stackoverflow.com/questions/66632666/circular-cropping-of-image-in-konvajs
                    ctx.arc(75, 75, 75, 0, Math.PI * 2, false);
                }}
                x={onCanvasComponents[CompKey].x}
                y={onCanvasComponents[CompKey].y}
                onDragStart={(e) => {
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
                           ...prevState[CompKey],                               isDragging: false,
                            x: e.target.x(),
                           y: e.target.y()  
                        }
                    }));
                }}
               draggable
            >
 
                <Image
                image={onCanvasComponents[CompKey].image}
                width={150}
                height={150}
                // style={}
                />
            </Group>

        </>
    )
}