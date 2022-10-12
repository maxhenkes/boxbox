import { memo } from "react";
import { Handle } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>Test</div>
      <input />
      <Handle
        type="source"
        position="right"
        id="a"
        isConnectable={isConnectable}
      />
    </>
  );
});
