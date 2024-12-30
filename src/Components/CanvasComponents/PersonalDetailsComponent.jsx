import { useEffect, useRef } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
export default function PersonalDetailsComponent({
  CompKey,
  scaleToggle,
  isSelected,
  setSelectedCanvasComponent,
  onCanvasComponents,
  setOnConvasComponents,
}) {
  const onCanvasName =
    onCanvasComponents[CompKey].firstname +
    " " +
    (onCanvasComponents[CompKey].preferredname != ""
      ? "(" + onCanvasComponents[CompKey].preferredname + ") "
      : "") +
    (onCanvasComponents[CompKey].middlename != ""
      ? onCanvasComponents[CompKey].middlename + " "
      : "") +
    onCanvasComponents[CompKey].lastname;
  const onCanvasSuffix =
    onCanvasComponents[CompKey].suffix != ""
      ? " " + onCanvasComponents[CompKey]
      : "";
  const onCanvasPhoneNumber =
    "(" +
    onCanvasComponents[CompKey].phonenumber.substring(0, 3) +
    ")" +
    "-" +
    onCanvasComponents[CompKey].phonenumber.substring(3, 6) +
    "-" +
    onCanvasComponents[CompKey].phonenumber.substring(6);

  const selectCurrentComponent = () => {
    console.log("this component is now selected");
    setSelectedCanvasComponent(CompKey);
  };

  const enableTransform = isSelected == true && scaleToggle == true;

  const trRef = useRef();
  useEffect(() => {
    if (scaleToggle) {
      trRef.current;
    }
  });

  return (
    <>
      <Group
        onClick={selectCurrentComponent}
        onTap={selectCurrentComponent}
        // width={60} // group does not need width or height
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
        // stroke={isSelected ? "green": ""}
        // group does not have border colors
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
          text={onCanvasName + onCanvasSuffix}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
        />
        <Text
          text={onCanvasPhoneNumber}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-10}
        />
        <Text
          text={onCanvasComponents[CompKey].emailaddress}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-20}
        />
        <Text
          text={onCanvasComponents[CompKey].linkedin}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-30}
        />
        <Text
          text={onCanvasComponents[CompKey].personalwebsite}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-40}
        />
        <Text
          text={onCanvasComponents[CompKey].github}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-50}
        />
        <Text
          text={onCanvasComponents[CompKey].facebook}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-60}
        />
        <Text
          text={onCanvasComponents[CompKey].instagram}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-70}
        />
        <Text
          text={onCanvasComponents[CompKey].twitter}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-80}
        />
        <Text
          text={onCanvasComponents[CompKey].bluesky}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-90}
        />
        <Text
          text={onCanvasComponents[CompKey].other}
          fontFamily={onCanvasComponents[CompKey].fontfamily}
          fontSize={onCanvasComponents[CompKey].fontsize}
          offsetY={-100}
        />
      </Group>
      {enableTransform && <Transformer />}
    </>
  );
}
