import * as ancestors from './ancestors.js';

const src = {
  ancestry: {
    defaultUrl: 'https://www.ancestry.com',
    id: '178204157',
    root: '352320388648',
  },
  familysearch: {
    defaultUrl: 'https://www.familysearch.org',
    id: 'L2Y8-T2J',
  },
  findagrave: {
    defaultUrl: 'https://www.findagrave.com',
    id: '1057635',
  },
};

const ids = ancestors.gentner;
// console.log(Object.keys(ancestors)); // How many imported elements there are.

export let active;

// HOMEPAGE FUNCTIONS. DEFAULT LINKS TO COMMONLY USED NAVIGATION PAGES.
export function getHomepage(website) {
  let homepage = '';

  if (website.toLowerCase() === 'ancestry') {
    if (src.ancestry.id !== undefined && src.ancestry.profile !== undefined) {
      homepage = `https://www.ancestry.com/family-tree/tree/${src.ancestry.id}/family?cfpid=${src.ancestry.root}`;
    }
  }
  if (website.toLowerCase() === 'familysearch') {
    homepage = `https://www.familysearch.org/tree/pedigree/fanchart/${src.familysearch.id}`;
  }
  if (website.toLowerCase() === 'findagrave') {
    homepage = `https://www.findagrave.com/virtual-cemetery/${src.findagrave.id}`;
  }

  return homepage;
}

// URL FUNCTIONS
// Generates a url given args website name and a person object. Else return undefined.
export function getUrl(website, person) {
  let url;

  if (website.toLowerCase() === 'ancestry') {
    if (src.ancestry.id !== undefined && person.ancestry !== '') {
      url = `https://www.ancestry.com/family-tree/person/tree/${src.ancestry.id}/person/${person.ancestry}/facts`;
    }
  }
  if (website.toLowerCase() === 'familysearch') {
    if (person.familysearch !== '') {
      url = `https://www.familysearch.org/tree/person/details/${person.familysearch}`;
    }
  }
  if (website.toLowerCase() === 'findagrave') {
    if (person.findagrave !== '') {
      url = `https://www.findagrave.com/memorial/${person.findagrave}/`;
    }
  }

  return url;
}

// Generates an object with keys corresponding to site names and values of unique ancestor urls.
export function getAllLinks(person) {
  const links = {};

  Object.keys(src).forEach((site) => {
    links[site] = {
      url: getUrl(site, person),
      default: src[site.toString()].defaultUrl,
    };
  });

  return links;
}

// Returns the homepage url for any source website in the database 'src'.
export function getDefaultUrl(website) {
  return src[website.toLowerCase()].defaultUrl;
}

// Extracts relevant person ids from urls with different websites.
export function getIdFromUrl(url) {
  let id;

  if (url) {
    if (url.includes('ancestry')) {
      id = url.match(/\/person\/(\d+)\//)
        ? url.match(/\/person\/(\d+)\//)[1]
        : src.ancestry.defaultUrl;
    }
    if (url.includes('familysearch')) {
      id = url.match(/([^/]+)$/)
        ? url.match(/([^/]+)$/)[1]
        : src.familysearch.defaultUrl;
    }
    if (url.includes('findagrave')) {
      id = url.match(/\/(\d+)\//)
        ? url.match(/\/(\d+)\//)[1]
        : src.findagrave.defaultUrl;
    }
  }

  return id;
}

// Returns only the domain name from a url.
export function getDomainName(url) {
  if (url) {
    const temp = url.slice(url.indexOf('www.') + 4, url.length);
    return temp.slice(0, temp.indexOf('.')); // Optimize with a regex later?
  }
}

// DATABASE FUNCTIONS
// export function findByName(surname, firstname) {
//     let person;
//     Object.keys(ids).forEach((id) => {
//         if (ids[id].surname.toLowerCase() === surname.toLowerCase()) {
//             if (ids[id].firstname.toLowerCase() === firstname.toLowerCase()) {
//                 person = ids[id];
//             }
//         }
//     });
//     return person;
// }

// If internalId exists, return the ancestor at that id. Else return undefined.
export function findById(id) {
  return ids[id] ? ids[id] : undefined;
}

// If person exists, return the id of that ancestor. Else return undefined.
export function findId(person) {
  const keys = Object.keys(ids);
  return keys.find((key) => ids[key] === person);
}

// Search the database for an ancestor with the corresponding id.
export function findByExternalId(externalId, website) {
  // If the website exists in the database of sources
  if (Object.keys(src).includes(website)) {
    // Iterate through the people in the ids database
    for (const id in ids) {
      // If the current persons id matches the argument id, return that persons index
      if (ids[id][website] === externalId) {
        return id;
      }
    }
  }

  return undefined;
}

// function addPerson(person) {
//     if (person.constructor.name === 'Person') { ids[Object.keys(ids).length + 1] = person; }
// }

// function swapIds(person1, person2) {
//     ids[findId(person1)] = person2;
//     ids[findId(person2)] = person1;
// }

export function setActive(id) {
  // If an ancestor is found with numerid arg id, load them as active. Else keep current active.
  if (/\d+/.test(id)) {
    active = findById(id) !== undefined ? findById(id) : active;
  } else if (searchByName(id).length >= 1) {
    active = searchByName(id)[0];
  }
}

export function reduceArray(key, value) {
  const people = [];

  Object.keys(ids).forEach((id) => {
    if (ids[id][key] === value) {
      people[people.length] = ids[id];
    }
  });

  return people.length >= 1 ? people : undefined;
}

// Finds people matching the string provided in this format: "Surname, First (Middle)"
export function searchByName(name) {
  let firstname;
  let middlename;
  let surname;
  let people = [];

  if (name.length >= 1 && !/^\s*$/.test(name)) {
    // If string > 1 and not whitespace.
    surname =
      name.indexOf(',') === -1 ? name : name.slice(0, name.indexOf(','));
    surname = surname
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\d+/g, '');

    if (surname !== undefined) {
      people = Object.keys(ids)
        .filter(
          (id) =>
            (ids[id].surname &&
              ids[id].surname.toLowerCase().startsWith(surname)) ||
            ids[id].maiden.toLowerCase().startsWith(surname),
        )
        .map((id) => ids[id]);
    }

    if (name.indexOf(',') !== name.length - 1 && name.indexOf(',') !== -1) {
      // If index of , is not end of string.
      firstname =
        name.indexOf(',') !== -1
          ? name.slice(name.indexOf(',') + 1, name.length)
          : undefined;
      firstname = firstname
        .trim()
        .toLowerCase()
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .slice(0, 1)
        .join();
    }

    //     middlename = name.indexOf(',') !== -1 ? name.slice(name.indexOf(',') + 1, name.length) : undefined;
    //     middlename = middlename.trim()
    //         .toLowerCase()
    //         .replace(/\s{2,}/g, ' ')
    //         .split(' ')
    //         .slice(1, 2)
    //         .join();
    // }

    if (firstname !== undefined) {
      people = Object.keys(people)
        .filter(
          (id) =>
            people[id].surname.toLowerCase() === surname ||
            people[id].maiden.toLowerCase() === surname,
        )
        .filter((id) => people[id].first.toLowerCase().startsWith(firstname))
        .map((id) => people[id]);
    }

    // if (middlename !== undefined) {
    //     people = Object.keys(people)
    //         .filter((id) => people[id].middle.toLowerCase().startsWith(middlename))
    //         .map((id) => people[id]);
    // }
  } else {
    people = Object.keys(ids)
      .filter((id) => ids[id])
      .map((id) => ids[id]);
  }

  return people;
}
