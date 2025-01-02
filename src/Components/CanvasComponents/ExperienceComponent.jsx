import { useEffect, useRef } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";

export default function ExperienceComponent({
  CompKey,
  isSelected,
  // selectCurrentComponent,
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
      transformerNode.nodes([shapeRef.current]); // updates the transform nodes to the transforming shape
    }
  }, [isTransformable]);

  // keep selectCurrentComponent helper function within each component for ease of access to respective Compkey
  const selectCurrentComponent = () => {
    console.log("this component is now selected: ", CompKey);
    setSelectedCanvasComponent(CompKey);
  };

  const text0 = onCanvasComponents[CompKey].jobposition;
  const text1 =
    onCanvasComponents[CompKey].companyname +
    ", " +
    onCanvasComponents[CompKey].companylocation;
  const text2 = onCanvasComponents[CompKey].employmenttype;
  const text3 =
    onCanvasComponents[CompKey].startdate +
    " to " +
    onCanvasComponents[CompKey].enddate;
  const text4 = onCanvasComponents[CompKey].jobachievement_no1;
  const text5 = onCanvasComponents[CompKey].jobachievement_no2;
  const text6 = onCanvasComponents[CompKey].jobachievement_no3;
  const text7 = onCanvasComponents[CompKey].jobachievement_no4;

  // try to rewrite this section in a more smarter way ie without manually typing in each compoent and its changes
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
          width={200}
          height={110}
        />
        <Group ref={groupRef}>
          {/* <Rect id="background_block" fill="gray" width={200} height={110} /> */}
          <Text
            id="component_text"
            text={text0}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            offsetY={0}
            // height={20}
          />
          <Text
            id="component_text"
            text={text1}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            // height={20}
            offsetY={-10 * Math.ceil((text0.length * 6) / 200)}
          />
          <Text
            id="component_text"
            text={text2}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            // height={20}
            offsetY={
              -10 *
              (Math.ceil((text0.length * 6) / 200) +
                Math.ceil((text1.length * 6) / 200))
            }
          />
          <Text
            id="component_text"
            text={text3}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            // height={20}
            offsetY={
              -10 *
              (Math.ceil((text0.length * 6) / 200) +
                Math.ceil((text1.length * 6) / 200) +
                Math.ceil((text2.length * 6) / 200))
            }
          />
          <Text
            id="component_text"
            text={text4}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            // width={100}
            width={200}
            // height={20}
            offsetY={
              -10 *
              (Math.ceil((text0.length * 6) / 200) +
                Math.ceil((text1.length * 6) / 200) +
                Math.ceil((text2.length * 6) / 200) +
                Math.ceil((text3.length * 6) / 200))
            }
          />
          <Text
            id="component_text"
            text={text5}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            // height={20}
            offsetY={
              -10 *
              (Math.ceil((text0.length * 6) / 200) +
                Math.ceil((text1.length * 6) / 200) +
                Math.ceil((text2.length * 6) / 200) +
                Math.ceil((text3.length * 6) / 200) +
                Math.ceil((text4.length * 6) / 200))
            }
          />
          <Text
            id="component_text"
            text={text6}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            // height={20}
            offsetY={
              -10 *
              (Math.ceil((text0.length * 6) / 200) +
                Math.ceil((text1.length * 6) / 200) +
                Math.ceil((text2.length * 6) / 200) +
                Math.ceil((text3.length * 6) / 200) +
                Math.ceil((text4.length * 6) / 200) +
                Math.ceil((text5.length * 6) / 200))
            }
          />
          <Text
            id="component_text"
            text={text7}
            fontFamily={onCanvasComponents[CompKey].fontfamily}
            fontSize={onCanvasComponents[CompKey].fontsize}
            width={200}
            // height={20}
            offsetY={
              -10 *
              (Math.ceil((text0.length * 6) / 200) +
                Math.ceil((text1.length * 6) / 200) +
                Math.ceil((text2.length * 6) / 200) +
                Math.ceil((text3.length * 6) / 200) +
                Math.ceil((text4.length * 6) / 200) +
                Math.ceil((text5.length * 6) / 200) +
                Math.ceil((text6.length * 6) / 200))
            }
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
