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

const ids = {
    1: {
        first: 'Zachary',
        middle: 'Norman',
        surname: 'Gentner',
        birth: '1992',
        death: 'Living',
        photo:
      'https://gravatar.com/userimage/79746757/3c912a1d5fb907c633bfb0842725cf2a.jpeg?size=256',
        ancestry: '352320388648',
        familysearch: 'L2Y8-T2J',
        findagrave: '',
        links: {},
    },
    2: {
        first: 'Todd',
        middle: 'William',
        surname: 'Gentner',
        birth: '1965',
        death: '2021',
        photo:
      'https://tributecenteronline.s3-accelerate.amazonaws.com/Obituaries/25770932/Thumbnail.jpg',
        ancestry: '352320388658',
        familysearch: 'L2YL-R5W',
        findagrave: '232743360',
    },
    3: {
        first: 'Debra',
        middle: 'Diane',
        surname: 'Gentner',
        maiden: 'Chatfield',
        birth: '1967',
        death: '',
        ancestry: '352320388669',
        familysearch: 'L2YL-RYV',
        findagrave: '242621477',
    },
    4: {
        first: 'Norman',
        middle: 'Russell',
        surname: 'Gentner',
        maiden: '',
        ancestry: '352320388755',
        familysearch: 'L2YL-YL7',
        findagrave: '175284135',
    },
    5: {
        first: 'Betty',
        middle: 'Rae',
        surname: 'Gentner',
        maiden: 'Helm',
        ancestry: '352320388741',
        familysearch: 'L2YX-JLJ',
        findagrave: '36924455',
    },
    6: {
        first: 'Robert',
        middle: 'Dennis',
        surname: 'Chatfield',
        maiden: '',
        ancestry: '352320388711',
        familysearch: 'L2YL-TSW',
        findagrave: '242408188',
    },
    7: {
        first: 'Diane',
        middle: 'Joyce',
        surname: 'Chatfield',
        maiden: 'MacKenzie',
        ancestry: '352320388725',
        familysearch: 'L2YL-TQ5',
        findagrave: '220745410',
    },
};

export let active = undefined;

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
    let links = {};

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

    if (url.includes('ancestry')) { id = url.match(/\/person\/(\d+)\//) ? url.match(/\/person\/(\d+)\//)[1] : src.ancestry.defaultUrl; }
    if (url.includes('familysearch')) { id = url.match(/([^/]+)$/) ? url.match(/([^/]+)$/)[1] : src.familysearch.defaultUrl; }
    if (url.includes('findagrave')) { id = url.match(/\/(\d+)\//) ? url.match(/\/(\d+)\//)[1] : src.findagrave.defaultUrl; }

    return id;
}

// Returns only the domain name from a url.
export function getDomainName(url) {
    const temp = url.slice(url.indexOf('www.') + 4, url.length);
    return temp.slice(0, temp.indexOf('.')); // Optimize with a regex later?
}

// DATABASE FUNCTIONS
export function findByName(name) {
    let person;
    Object.keys(ids).forEach((id) => {
        if (ids[id].name === name) { person = ids[id]; }
    });
    return person;
}

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
    if(Object.keys(src).includes(website)) {
        // Iterate through the people in the ids database
        for (let id in ids) {
            // If the current persons id matches the argument id, return that persons index
            if (ids[id][website] === externalId) { return id; }
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
    // If an ancestor is found with arg id, load them as active. Else keep current active.
    active = findById(id) !== undefined ? findById(id) : active;
}

// NAME FUNCTIONS
export function getFirstName(person) {
    if (person.first) { return person.first; }
    return undefined;
}

export function getMiddleName(person) {
    if (person.middle) { return person.middle; }
    return undefined;
}

export function getSurame(person) {
    if (person.surname) { return person.surname; }
    return undefined;
}

export function getMaidenName(person) {
    if (person.maiden) { return person.maiden; }
    return undefined;
}

export function getFullName(person) {
    let name;

    if (person !== undefined) {
        const middleInitial = person.middle ? `${person.middle[0]}. ` : '';
        const maidenName = person.maiden ? `(${person.maiden}) ` : '';

        name = `${person.first} ${middleInitial}${maidenName}${person.surname}`;
    }

    return name;
}

// DATE FUNCTIONS
export function getBirthYear(person) {
    if (person.birth) { return `${person.birth}`; }
    return undefined;
}

export function getDeathYear(person) {
    if (person.death) { return `${person.death}`; }
    return undefined;
}

export function getPhoto(person) {
    if (person.photo !== '' && person.photo !== undefined) {
        return person.photo;
    }
    return undefined;
}

// SEARCH FUNCTIONS
// Add quick search options based on the current active ancestor for common genealogical websites.
export function searchForebears(person) {
    if (person.maiden !== '' && person.maiden !== undefined) {
        return `https://forebears.io/surnames/${person.maiden}`;
    }
    return `https://forebears.io/surnames/${person.surname}`;
}
