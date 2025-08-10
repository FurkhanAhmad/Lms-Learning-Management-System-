import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (value) => {
    setInput((prev) => ({ ...prev, description: value }));
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={input?.description || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default RichTextEditor;
