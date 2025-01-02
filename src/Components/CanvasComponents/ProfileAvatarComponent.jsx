import { Group, Rect, Text, Transformer, Image } from "react-konva";
import { useEffect, useRef } from "react";

export default function ProfileAvatarComponent({
  CompKey,
  isTransformable,
  isSelected,
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
    // no need to compensate for offsets and widths or heights because the image is clipped onto the group
    groupRef.current.setAttrs(transformAttrs);
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
        x={onCanvasComponents[CompKey].x}
        y={onCanvasComponents[CompKey].y}
        onDragStart={() => {
          console.log("dragging image");
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
          width={150}
          height={150}
        />

        <Group
          ref={groupRef}
          clipFunc={(ctx) => {
            // based on:  https://stackoverflow.com/questions/66632666/circular-cropping-of-image-in-konvajs
            ctx.arc(75, 75, 75, 0, Math.PI * 2, false);
          }}
        >
          <Image
            image={onCanvasComponents[CompKey].image}
            width={150}
            height={150}
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
