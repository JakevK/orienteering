import { useState } from "react";
import newId from "../utils/newId";
import Form from "react-bootstrap/Form";

const RadioMenu = ({ title, options, defaultIndex }) => {
  const [selected, setSelected] = useState(defaultIndex);
  const mapOptions = (option, i) => {
    const id = newId();
    return (
      <Form.Check
        key={i}
        type="radio"
        id={`default-radio-${id}`}
        label={option.label}
        checked={i === selected}
        onChange={() => {
          option.onSelect();
          setSelected(i);
        }}
      />
    );
  };
  return (
    <div>
      <strong>{title}</strong>
      <div>{options.map(mapOptions)}</div>
    </div>
  );
};

export default RadioMenu;
