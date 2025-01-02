import { Group, Rect, Text, Transformer } from "react-konva";
import { useEffect, useRef } from "react";

export default function EducationComponent({
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
          ref={shapeRef}
          stroke={isSelected ? "green" : ""}
          width={200}
          height={80}
        />
        {/* <Rect fill="gray" width={50} height={60} /> */}
        <Group ref={groupRef}>
          <Text
            text={
              onCanvasComponents[CompKey].degree +
              " " +
              onCanvasComponents[CompKey].major
            }
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
          />
          <Text
            text={onCanvasComponents[CompKey].institution}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-10}
          />
          <Text
            text={
              "Graduated in " +
              onCanvasComponents[CompKey].graduationmonth +
              " " +
              onCanvasComponents[CompKey].graduationyear
            }
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={-20}
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
