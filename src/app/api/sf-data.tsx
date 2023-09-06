import React from 'react';

interface SFDataProps {
  sfData: any[]; // Replace 'any' with the actual type of your SF Express data
}

const SFData: React.FC<SFDataProps> = ({ sfData }) => {
  return (
    <div>
      <h2>SF Express Response Data as Array:</h2>
      <ul>
        {sfData.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default SFData;