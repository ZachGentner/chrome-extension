// Class structure for people and their relevant information.
export default class Person {
  first;
  middle;
  maiden;
  surname;
  // sex;
  birth;
  death;
  // photo;
  // links;
  ancestry;
  familysearch;
  findagrave;
  // notes;
  constructor() {
    this.first = undefined;
    this.middle = undefined;
    this.maiden = undefined;
    this.surname = undefined;
    this.birth = undefined;
    this.death = undefined;
    this.ancestry = undefined;
    this.familysearch = undefined;
    this.findagrave = undefined;
    // this.links = [];
    // this.notes = '';
  }
}

// const templatePerson = {
//   meta: {
//     links: [],
//     notes: '',
//     photo,
//     ancestry,
//     familysearch,
//     findagrave,
//   },
//   name: {
//     first,
//     middle,
//     maiden,
//     last,
//     alias,
//   },
//   // BIRTH
//   birthdate,
//   // DEATH
//   deathdate,
// };
