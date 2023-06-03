import React from "react";
import { Line, Circle } from "rc-progress";

function ProgressComp({ line, circle, value, strokeColor }) {
  return (
    <div>
      {line && (
        <Line
          percent={value}
          strokeWidth="4"
          strokeColor={strokeColor}
          trailColor="#ebebeb"
        />
      )}
      {circle && (
        <Circle percent={value} strokeWidth="4" strokeColor={strokeColor} />
      )}
    </div>
  );
}

export default ProgressComp;
