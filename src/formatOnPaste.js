// Helpers.
import formatText from "./formatText";

// Constants.
const f = "function";
const o = "object";

const formatOnPaste = (
  event = {
    preventDefault() {},
  }
) => {
  // Prevent paste.
  event.preventDefault();

  // Set later.
  let value = "";

  // Does method exist?
  const hasEventClipboard = !!(
    event.clipboardData &&
    typeof event.clipboardData === o &&
    typeof event.clipboardData.getData === f
  );

  // Get clipboard data?
  if (hasEventClipboard) {
    value = event.clipboardData.getData("text/plain");
  }

  // Insert into temp `<textarea>`, read back out.
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  value = textarea.innerText;

  // Clean up text.
  value = formatText(value);

  // Insert text.
  if (typeof document.execCommand === f) {
    document.execCommand("insertText", false, value);
  }
};

// Export.
export default formatOnPaste;
