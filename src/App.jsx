// File: App.js
import React from 'react';
import Dropdown from './components/Dropdown';

const App = () => {
  const handleSelect = (value) => {
    console.log('Selected:', value);
  };

  return (
    <div style={{ padding: '50px' }}>
      <Dropdown
        options={['Option 1', 'Option 2', 'Option 3']}
        onSelect={handleSelect}
        placeholder="Select an option"
      />
    </div>
  );
};

export default App;
