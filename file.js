import * as fs from 'fs';

// The file path for persistent storage.
const path = 'ancestors.json';

// Creates
const ancestors = openFile()

let person = {
    first: 'John',
    middle: 'Michael',
    surname: 'Doe',
    maiden: '',
    birth: '1900',
    death: '2000',
    ancestry: '1234567',
    familysearch: 'HVG3-A55',
    findagrave: '7654321'
}

// addAncestor(person);
console.log(ancestors);
saveFile();

//DATABASE FUNCTIONS
// Adds a new ancestor with a key i + 1.
function addAncestor(ancestor) {
    ancestors[Object.keys(ancestors).length + 1] = ancestor;
}

// Removes an ancestor at a given index.
function removeAncestor(index) {
    if (ancestors[index]) delete ancestors[index];
}

//FILE FUNCTIONS
// Converts the stringified data in the file into a javascript object for manipulation.
function openFile() {
    return JSON.parse(
        fs.readFileSync(path, 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        })
    );
}

// Converts the current ancestors object into a string for persistent storage and retrieval.
function saveFile() {
    fs.writeFile(path, JSON.stringify(ancestors), function (err) {
        if (err) throw err;
        // console.log("Successfully saved data to JSON file!");
    })
}

