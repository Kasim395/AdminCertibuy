import React, { useState } from 'react';
import './alertbox.css';


const AlertBox = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log(`Selected option: ${selectedOption}, Input value: ${inputValue}`);
    setIsOpen(false);
  };

  return (
    <>
      <button className="alert-btn" onClick={() => setIsOpen(true)}>Open Alert Box</button>
      {isOpen && (
        <div className="alert-box">
          <h2 className="alert-heading">Alert Box</h2>
          <div className="alert-content">
            <label htmlFor="option-picker">Select an option:</label>
            <select id="option-picker" value={selectedOption} onChange={handleOptionChange}>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <label htmlFor="input-field">Input field:</label>
            <input id="input-field" type="text" value={inputValue} onChange={handleInputChange} />
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertBox;