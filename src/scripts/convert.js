// For converting GEDCOM files into JSON.
import * as fs from 'fs';
import Person from './person.js';

// FILE VARIABLES
const PATH = 'ref/ancestry.ged';
const file = fs.readFileSync(PATH, 'utf8');
let corp;

// LOOKUP REGEX
const CORP = /2 CORP/g; // CORPORATION
const INDI = /^0 @I\d+@ INDI$/g; // INDIVIDUAL
// const NAME = /1 NAME/g; // NAME
const GIVN = /2 GIVN/g; // GIVEN NAME
const SURN = /2 SURN/g; // SURNAME
const BIRT = /^1 BIRT$/g; // BIRTH
const DEAT = /^1 DEAT$/g; // DEATH
// const BURI = /^1 BURI$/g; // BURIAL
const FSID = /1 _FSID/g; // FAMILYSEARCH
const AMTID = /1 _AMTID/g; // ANCESTRY
// Detail Groups
const DATE = /2 DATE/g; // DATE
// const PLAC = /2 PLAC/g; // PLACE

// ITERATE THROUGH EACH LINE IN THE GEDCOM FILE
const fileArr = file.split(/\r?\n/);
const people = {};
let person;

fileArr.forEach((line, index) => {
  //   console.log(`${index}: ${line}`);
  //   console.log(`${index}: ${fileArr[index + 1]}`);
  if (line.match(CORP)) {
    corp = line.slice(7);
  }

  if (line.match(INDI)) {
    // If a person already exists...
    if (person) {
      people[`${Object.keys(people).length + 1}`] = person; // Add them at the n+1 index of the object people.
    }

    person = new Person(); // Create a new person object for each new INDI line.

    // ANCESTRY (Only if file source is ancestry, as they use website IDs as INDI indices.)
    if (corp === 'Ancestry.com') {
      person.ancestry = line.slice(
        line.indexOf('@I') + 2,
        line.indexOf('@ INDI'),
      );
    }
  }

  if (person !== undefined) {
    // GIVEN NAME (SHOULD BE CONSOLIDATED INTO ONE NAME)
    if (line.match(GIVN)) {
      const name = line.slice(7);

      if (name.includes(' ')) {
        person.first = name.slice(0, name.indexOf(' '));
        person.middle = name.slice(name.indexOf(' ')).trim();
      } else {
        person.first = name;
        person.middle = '';
      }
    }

    // SURNAME
    if (line.match(SURN)) {
      const surname = line.slice(7);
      person.surname = person.surname !== '' ? surname : undefined;
    }

    // BIRTH
    if (line.match(BIRT)) {
      if (fileArr[index + 1].match(DATE)) {
        const birthyear = fileArr[index + 1].slice(7);
        if (birthyear.match(/\d{4}/)) {
          person.birth = birthyear.match(/\d{4}/)[0];
          //   console.log(birthyear.match(/\d{4}/)[0]);
        }
      }
    }

    // DEATH
    if (line.match(DEAT)) {
      if (fileArr[index + 1].match(DATE)) {
        const deathyear = fileArr[index + 1].slice(7);
        if (deathyear.match(/\d{4}/)) {
          person.death = deathyear.match(/\d{4}/)[0];
          //   console.log(deathyear.match(/\d{4}/)[0]);
        }
      }
    }

    // FAMILYSEARCH
    if (line.match(FSID)) {
      person.familysearch = line.slice(8);
    }

    // ANCESTRY
    if (line.match(AMTID)) {
      person.ancestry = line.slice(8, line.indexOf(':'));
    }

    // MAIDEN NAME
    person.maiden = ''; // Necessary for current code

    // FIND A GRAVE
    person.findagrave = ''; // Necessary for current code
  }
});

// Converts the stringified data in the file into a javascript object for manipulation.
export function openFile() {
  return JSON.parse(
    fs.readFileSync('./src/ancestors.json', 'utf8', (err, data) => {
      if (err) throw err;
      return data;
    }),
  );
}

// Converts the current ancestors object into a string for persistent storage and retrieval.
export function saveFile() {
  fs.writeFile('./src/ancestors.json', JSON.stringify(people), (err) => {
    if (err) throw err;
  });
}

// console.log(people);
saveFile();

// PRINT FIRST 10 PEOPLE IN DATABASE
// for (let i = 0; i < 10; i++) {
//   console.log(people[i]);
// }

// FOR FINDING MARRIED NAMES
// 0 @F119@ FAM
// 1 HUSB @I352320388753@
// 1 WIFE @I352320388985@
