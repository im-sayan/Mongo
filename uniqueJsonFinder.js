const fs = require('fs');

// Function to read JSON file
function readJSONFile(filename) {
    try {
        const jsonString = fs.readFileSync(filename, 'utf8');
        return JSON.parse(jsonString);
    } catch (err) {
        console.error(`Error reading file ${filename}:`, err);
        return null;
    }
}

// Function to find unique objects between two arrays
function findUniqueObjects(array1, array2) {
    const uniqueObjects = [];

    // Using Map to store objects for efficient lookup
    const map = new Map();

    // Function to stringify object keys in a case-insensitive manner
    function getKey(obj) {
        return JSON.stringify(obj, Object.keys(obj).sort(), null).toLowerCase();
    }

    // Add all objects from array1 to the map (using lowercase keys)
    array1.forEach(obj => {
        const key = getKey(obj);
        map.set(key, obj);
    });

    // Check each object in array2 if it exists in map (using lowercase keys)
    array2.forEach(obj => {
        const key = getKey(obj);
        if (!map.has(key)) {
            uniqueObjects.push(obj);
            map.set(key, obj); // Store in map to avoid duplicates in output
        }
    });

    return uniqueObjects;
}

// Function to write JSON to a file
function writeJSONFile(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`Unique objects saved to ${filename}`);
    } catch (err) {
        console.error(`Error writing to file ${filename}:`, err);
    }
}

// Example usage
const file1 = 'F:\\MongoDb\\mongo\\admincountries.json';
const file2 = 'F:\\MongoDb\\mongo\\countries.json';
const outputFile = 'F:\\MongoDb\\mongo\\uniqueObjects.json'; // Output file for unique objects

// Read JSON files
const json1 = readJSONFile(file1);
const json2 = readJSONFile(file2);

if (json1 && json2) {
    // Assuming json1 and json2 are arrays of objects
    const uniqueObjects = findUniqueObjects(json1, json2);
    console.log('Unique Objects:', uniqueObjects);

    // Write unique objects to output file
    writeJSONFile(outputFile, uniqueObjects);
} else {
    console.log('Error reading JSON files.');
}
