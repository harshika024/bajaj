import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    
    try {
      // Validate JSON input
      const jsonData = JSON.parse(inputValue);
      if (!jsonData.data || !Array.isArray(jsonData.data)) {
        throw new Error('Invalid JSON format');
      }

      // Call the API
      const result = await axios.post('http://127.0.0.1:8000/api', {
        user_id: "12345", // Replace with actual data
        college_email: "user@college.edu", // Replace with actual data
        college_roll_number: "CR123456", // Replace with actual data
        numbers: jsonData.data.filter(item => !isNaN(item)).map(Number),
        alphabets: jsonData.data.filter(item => isNaN(item))
      });
      
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    
    const { 'Array for numbers': numbers, 'Array for alphabets': alphabets, 'Array with the highest lowercase alphabet': highestAlphabet } = response;
    
    const responseData = {
      Alphabets: selectedOptions.includes('Alphabets') ? alphabets : [],
      Numbers: selectedOptions.includes('Numbers') ? numbers : [],
      'Highest lowercase alphabet': selectedOptions.includes('Highest lowercase alphabet') ? highestAlphabet : []
    };

    return (
      <div>
        {Object.entries(responseData).map(([key, value]) => (
          <div key={key}>
            <h3>{key}</h3>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter JSON, e.g., {"data": ["A", "C", "z"]}'
        />
        <br />
        <button type="submit">Submit</button>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <br />
      <select multiple onChange={handleOptionChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      <div>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
