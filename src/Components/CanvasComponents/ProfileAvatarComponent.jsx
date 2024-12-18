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
                    // based on: https://stackoverflow.com/questions/69082857/how-to-add-styling-to-image-component-in-react-konva
                    // ctx.arc({x: 75, y: 75, outerRadius: 75})
                    // const cornerRadius = 90;
                    // const width = 150;
                    // const height = 150;
                    // ctx.beginPath();
                    // ctx.moveTo(cornerRadius, 0);
                    // ctx.lineTo(width - cornerRadius, 0);
                    // ctx.quadraticCurveTo(width, 0, width, cornerRadius);
                    // ctx.lineTo(width, height - cornerRadius);
                    // ctx.quadraticCurveTo(width, height, width - cornerRadius, height);
                    // ctx.lineTo(cornerRadius, height);
                    // ctx.quadraticCurveTo(0, height, 0, height - cornerRadius);
                    // ctx.lineTo(0, cornerRadius);
                    // ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
                    // ctx.closePath();
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
                {/* <Rect 
                fill="red"
                stroke={onCanvasComponents[CompKey].isDragging ? "green": "black"} 
                width={151} 
                height={151} 
                /> */}
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