import React from "react";
import { useState } from "react";
import "./Notelist.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { ChromePicker } from "react-color";

const Notelist = ({
  title,
  content,
  onSelect,
  id,
  onEdit,
  onColorChange,
  color,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  console.log("color" + color);
  return (
    <div>
      <div className="box" style={{ backgroundColor: color }}>
        <h2>{title}</h2>
        <h3>{content}</h3>
        <button
          className="delete"
          onClick={() => {
            onSelect(id);
          }}
        >
          <DeleteIcon />
        </button>
        <button className="edit" onClick={() => onEdit(id)}>
          <EditIcon />
        </button>
        <button
          className="color"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <ColorLensIcon />
        </button>
        {showColorPicker && (
          <div className="color-picker-overlay">
            <ChromePicker
              color={color}
              onChangeComplete={(selectedColor) => {
                console.log("Selected Color:", selectedColor.hex);
                onColorChange(selectedColor.hex);
              }}
              disableAlpha
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notelist;
