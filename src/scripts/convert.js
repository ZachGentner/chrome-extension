// For converting GEDCOM files into JSON.
import * as fs from 'fs';
import Person from './person.js';

// FILE VARIABLES
const PATH = 'ref/ancestry.ged';
const file = fs.readFileSync(PATH, 'utf8');

// LOOKUP REGEX
const INDI = /^0 @I\d+@ INDI$/g; // INDIVIDUAL
const NAME = /1 NAME/g; // NAME
const BIRT = /^1 BIRT$/g; // BIRTH
const DEAT = /^1 DEAT$/g; // DEATH
const BURI = /^1 BURI$/g; // BURIAL
const FSID = /1 _FSID/g; // FAMILYSEARCH
// Detail Groups
const DATE = /2 DATE/g; // DATE
const PLAC = /2 PLAC/g; // PLACE

// ITERATE THROUGH EACH LINE IN THE GEDCOM FILE
const fileArr = file.split(/\r?\n/);
const people = {};
let person;

fileArr.forEach((line, index) => {
  //   console.log(`${index}: ${line}`);
  //   console.log(`${index}: ${fileArr[index + 1]}`);
  if (line.match(INDI)) {
    if (person) {
      people[`${Object.keys(people).length + 1}`] = person;
    }

    person = new Person();
    // ANCESTRY
    person.ancestry = line.slice(
      line.indexOf('@I') + 2,
      line.indexOf('@ INDI'),
    );
  }

  if (person !== undefined) {
    // NAME
    if (line.match(NAME)) {
      const name = line.slice(7);
      const firstname = name.slice(0, name.indexOf(' '));
      const middlename = name
        .slice(name.indexOf(' '), name.indexOf('/'))
        .trim();
      const surname = line.slice(line.indexOf('/') + 1, line.length - 1);
      person.first = person.first !== '' ? firstname : undefined;
      person.middle = middlename !== '' ? middlename : undefined;
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
      person.familysearch = line.slice(8, line.length);
    }
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
