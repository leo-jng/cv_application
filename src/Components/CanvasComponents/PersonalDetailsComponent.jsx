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
    const transformAttrs = transform.decompose(); // decompose is a prototype method that extracts the transforming attributes into a readable object
    // check what the attributes are
    console.log("transform:", transform, "attrs:", transformAttrs);
    // const newAttrs = {
    //   width: Math.max(110 * transformAttrs.scaleX, 110),
    //   height: Math.max(110 * transformAttrs.scaleY, 110),
    //   scaleX: 1,
    //   scaleY: 1,
    // };
    // apply the transforming attributes of the transforming shape to the group
    // groupRef.current.setAttrs(newAttrs);
    // it is possible to manually iterate through the components held within the group to apply the changes to them instead of the group
    // console.log("current group", groupRef.current);
    const groupRefChildren = groupRef.current.getChildren();
    console.log("children of current group", groupRefChildren);
    let totalLines = 0; // used to keep track of offsets
    groupRefChildren.forEach((node) => {
      // console.log(
      //   "current width: ",
      //   node.attrs.width,
      //   "current scalex: ",
      //   transformAttrs.scaleX,
      //   "current transforming attributes: ",
      //   node.attrs.width * transformAttrs.scaleX
      // );
      // if (node.attrs.id == "component_text") {
      node.setAttrs({
        width: Math.max(200 * transformAttrs.scaleX, 10),
        // height: Math.max(20 * transformAttrs.scaleY, 10),
        scaleX: 1,
        scaleY: 1,
        offsetY:
          -10 * totalLines * transformAttrs.scaleY +
          Math.max(-1 * transformAttrs.y, 0),
        offsetX: Math.max(-1 * transformAttrs.x, 0),
      });

      const currentLinesCount = node.textArr.length;
      totalLines += currentLinesCount;
      console.log(totalLines);
      // }
    });
    groupRef.current.scaleX(1);
    groupRef.current.scaleY(1);
    groupRef.current.getLayer().batchDraw();
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

  const selectCurrentComponent = () => {
    // this is basically the onSelect function
    console.log("this component is now selected");
    setSelectedCanvasComponent(CompKey);
  };

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
          width={200}
          height={110}
        />

        <Group ref={groupRef}>
          {/* <Rect fill="gray" width={90} height={90} /> */}

          <Text
            text={onCanvasName + onCanvasSuffix}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
          />
          <Text
            text={onCanvasPhoneNumber}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-10}
          />
          <Text
            text={onCanvasComponents[CompKey].emailaddress}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-20}
          />
          <Text
            text={onCanvasComponents[CompKey].linkedin}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-30}
          />
          <Text
            text={onCanvasComponents[CompKey].personalwebsite}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-40}
          />
          <Text
            text={onCanvasComponents[CompKey].github}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-50}
          />
          <Text
            text={onCanvasComponents[CompKey].facebook}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-60}
          />
          <Text
            text={onCanvasComponents[CompKey].instagram}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-70}
          />
          <Text
            text={onCanvasComponents[CompKey].twitter}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-80}
          />
          <Text
            text={onCanvasComponents[CompKey].bluesky}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-90}
          />
          <Text
            text={onCanvasComponents[CompKey].other}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
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
