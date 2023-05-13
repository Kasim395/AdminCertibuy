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
    <select defaultValue={selectedValue} onChange={handlePickerChange}>
       <option value="Excellent">Excellent</option>
      <option value="Workable">Workable</option>
      <option value="Faulty">Faulty</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}

export default DropdownPicker;