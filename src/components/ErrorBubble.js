import React from "react";
import "./bubbleStyles.css";

function ErrorBubble({ text, top, left, right, bottom }) {
  return (
    <div
      style={{
        position: "absolute",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
      }}
      class="bubble"
    >
      {text}
    </div>
  );
}

export default ErrorBubble;
