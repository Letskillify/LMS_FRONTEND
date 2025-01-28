import React, { useState } from "react";
import Papa from "papaparse";

const CsvToJsonConverter = () => {
  const [jsonData, setJsonData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Parse the CSV file
      Papa.parse(file, {
        header: true, // Treat the first row as header
        skipEmptyLines: true,
        complete: (result) => {
          setJsonData(result.data); // Parsed JSON data
          console.log("Converted JSON Data:", result.data);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  return (
    <div>
      <h2>CSV to JSON Converter</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <pre style={{ marginTop: "20px", backgroundColor: "#f4f4f4", padding: "10px" }}>
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
};

export default CsvToJsonConverter;
