import { useEffect, useRef } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
export default function PersonalDetailsComponent({
  CompKey,
  isSelected,
  isTransformable,
  setSelectedCanvasComponent,
  onCanvasComponents,
  setOnConvasComponents,
}) {
  // based on https://stackoverflow.com/questions/66046417/how-to-set-the-initial-dimensions-of-a-transformer-when-applying-it-on-a-group-h
  const shapeRef = useRef(null);
  const transformerRef = useRef(null);
  const groupRef = useRef(null);

  function transformCurrentComponent(e) {
    console.log("transform/scaling activated");
    const transformingShape = e.target;
    const transform = transformingShape.getTransform().copy();
    const attrs = transform.decompose();
    // check what the attributes are
    console.log(attrs);
    const newAttrs = {
      width: Math.max(110 * attrs.scaleX, 110),
      height: Math.max(110 * attrs.scaleY, 110),
      scalex: 1,
      scaley: 1,
    };
    // copy it to the other components/shapes within the group
    groupRef.current.setAttrs(newAttrs);
  }

  useEffect(() => {
    if (isTransformable) {
      const transformerNode = transformerRef.current;
      transformerNode.enabledAnchors([
        "top-center",
        "middle-right",
        "middle-left",
        "bottom-center",
      ]);
      transformerNode.nodes([shapeRef.current]); // updates the transform nodes to the entire group
    }
  }, [isTransformable]);

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
    // this is basically the onSelect function
    console.log("this component is now selected");
    setSelectedCanvasComponent(CompKey);
  };

  return (
    <>
      <Group
        onClick={selectCurrentComponent}
        onTap={selectCurrentComponent}
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
          ref={shapeRef}
          stroke={isSelected ? "green" : ""}
          // transform border follows width and height of this rectangle
          width={110}
          height={110}
        />

        <Group ref={groupRef}>
          <Rect fill="gray" width={90} height={90} />

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
      </Group>
      {isTransformable && (
        <Transformer
          rotateEnabled={false}
          ref={transformerRef}
          onTransform={transformCurrentComponent}
        />
      )}
    </>
  );
}
