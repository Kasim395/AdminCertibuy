import React, { useState } from 'react';

function DropdownPicker(props) {
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);

  const handlePickerChange = (event) => {
    setSelectedValue(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <select value={selectedValue} onChange={handlePickerChange}>
      <option value="faulty">Faulty</option>
      <option value="bad">Bad</option>
      <option value="good">Good</option>
      <option value="excellent">Excellent</option>
    </select>
  );
}

export default DropdownPicker;