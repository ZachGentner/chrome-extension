import * as fs from 'fs';

// The file path for persistent storage.
const path = 'ancestors.json';

const person = {
    first: 'John',
    middle: 'Michael',
    surname: 'Doe',
    maiden: '',
    birth: '1900',
    death: '2000',
    ancestry: '1234567',
    familysearch: 'HVG3-A55',
    findagrave: '7654321',
};

// DATABASE FUNCTIONS
// Adds a new ancestor with a key i + 1.
// function addAncestor(ancestor) {
//     ancestors[Object.keys(ancestors).length + 1] = ancestor;
// }

// Removes an ancestor at a given index.
// function removeAncestor(index) {
//     if (ancestors[index]) delete ancestors[index];
// }

// FILE FUNCTIONS
// Converts the stringified data in the file into a javascript object for manipulation.
function openFile() {
    return JSON.parse(
        fs.readFileSync(path, 'utf8', (err, data) => {
            if (err) throw err;
            return data;
        }),
    );
}

// Converts the current ancestors object into a string for persistent storage and retrieval.
function saveFile(file) {
    fs.writeFile(path, JSON.stringify(file), (err) => {
        if (err) throw err;
    });
}

// Years, by country, census was taken.
// Use to calculate how many censuses ancestor should have appeared in during their lifespan.
// const census = {
//     us: {
//         1790: true,
//         1800: true,
//         1810: true,
//         1820: true,
//         1830: true,
//         1840: true,
//         1850: true,
//         1860: true,
//         1870: true,
//         1880: true,
//         1890: true,
//         1900: true,
//         1910: true,
//         1920: true,
//         1930: true,
//         1940: true,
//         1950: true,
//     },
// };

// Creates a means of accessing the file.
const ancestors = openFile();

// addAncestor(person);
console.log(person);
console.log(ancestors);
saveFile(ancestors);
