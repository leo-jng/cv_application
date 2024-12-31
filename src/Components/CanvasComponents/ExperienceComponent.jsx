import { useEffect, useRef } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";

export default function ExperienceComponent({
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
    const attrs = transform.decompose(); // decompose is a prototype method that extracts the transforming attributes into a readable object
    // check what the attributes are
    console.log("transform:", transform, "attrs:", attrs);
    const newAttrs = {
      width: Math.max(110 * attrs.scaleX, 110),
      height: Math.max(110 * attrs.scaleY, 110),
      scaleX: 1,
      scaleY: 1,
    };
    // apply the transforming attributes of the transforming shape to the group
    groupRef.current.setAttrs(newAttrs);
    // it is possible to manually iterate through the components held within the group to apply the changes to them instead of the group
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
      transformerNode.nodes([shapeRef.current]); // updates the transform nodes to the transforming shape
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
          stroke={isSelected ? "green" : ""}
          ref={shapeRef}
          width={70}
          height={80}
        />
        <Group ref={groupRef}>
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
            // width={100}
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
