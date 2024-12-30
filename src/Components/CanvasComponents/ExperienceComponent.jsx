import { Group, Rect, Text } from "react-konva";

export default function ExperienceComponent({
  CompKey,
  isSelected,
  setSelectedCanvasComponent,
  onCanvasComponents,
  setOnConvasComponents,
}) {
  const selectCurrentComponent = () => {
    console.log("this component is now selected");
    setSelectedCanvasComponent(CompKey);
  };

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
            },
          }));
        }}
        onDragEnd={(e) => {
          setOnConvasComponents((prevState) => ({
            ...prevState,
            [CompKey]: {
              ...prevState[CompKey],
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            },
          }));
        }}
        draggable={isSelected ? true : false}
      >
        <Rect
          // fill="gray"
          // this is the select border
          stroke={isSelected ? "green" : ""}
          width={70}
          height={80}
        />
        <Rect fill="gray" width={50} height={60} />
        <Text
          text={onCanvasComponents[CompKey].jobposition}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
        />
        <Text
          text={
            onCanvasComponents[CompKey].companyname +
            ", " +
            onCanvasComponents[CompKey].companylocation
          }
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-10}
        />
        <Text
          text={onCanvasComponents[CompKey].employmenttype}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-20}
        />
        <Text
          text={
            onCanvasComponents[CompKey].startdate +
            " to " +
            onCanvasComponents[CompKey].enddate
          }
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-30}
        />
        <Text
          text={onCanvasComponents[CompKey].jobachievement_no1}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-40}
        />
        <Text
          text={onCanvasComponents[CompKey].jobachievement_no2}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-50}
        />
        <Text
          text={onCanvasComponents[CompKey].jobachievement_no3}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-60}
        />
        <Text
          text={onCanvasComponents[CompKey].jobachievement_no4}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-70}
        />
      </Group>
    </>
  );
}
