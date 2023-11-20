// Class structure for people and their relevant information.
export default class Person {
  first;
  middle;
  maiden;
  surname;
  birth;
  death;
  // photo;
  // links;
  // notes;
  ancestry;
  familysearch;
  findagrave;
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
  fullname() {
    const firstName = this.first ? `${this.first} ` : '';
    const middleInitial = this.middle ? `${this.middle[0]}. ` : '';
    const maidenName = this.maiden ? `(${this.maiden}) ` : '';
    const lastName = this.surname ? `${this.surname}` : '';

    return `${firstName}${middleInitial}${maidenName}${lastName}`;
  }
}

// const templatePerson = {
//   meta: {
//     ancestry,
//     familysearch,
//     findagrave,
//     links: [],
//     notes: '',
//     photo,
//   },
//   name: {
//     first,
//     middle,
//     maiden,
//     surname,
//     alias,
//   },
//   birth: {
//     date,
//     place,
//   },
//   death: {
//     date,
//     place,
//   },
//   burial: {
//     date,
//     place,
//   },
// };
