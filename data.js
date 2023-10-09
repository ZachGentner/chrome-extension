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

class Person {
    first;
    middle;
    surname;
    sex;
    birth;
    death;
    photo;
    links;
    ancestry;
    familysearch;
    findagrave;

    constructor(first, surname) {
        this.first = first;
        this.middle = '';
        this.surname = surname;
        this.sex = '';
        this.birth = '';
        this.death = '';
        this.photo = '';
        this.links = [];
        this.ancestry = '';
        this.familysearch = '';
        this.findagrave = '';
    }
}

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

export let active = ids[1];

// HOMEPAGE FUNCTIONS. DEFAULT LINKS TO COMMONLY USED NAVIGATION PAGES.
export function getHomepage(website) {
    if (website.toLowerCase() === 'ancestry') {
        if (src.ancestry.id !== undefined && src.ancestry.profile !== undefined) {
            return `https://www.ancestry.com/family-tree/tree/${src.ancestry.id}/family?cfpid=${src.ancestry.root}`;
        }
    }
    if (website.toLowerCase() === 'familysearch') {
        return `https://www.familysearch.org/tree/pedigree/fanchart/${src.familysearch.id}`;
    }
    if (website.toLowerCase() === 'findagrave') {
        return `https://www.findagrave.com/virtual-cemetery/${src.findagrave.id}`;
    }
}

// URL FUNCTIONS
export function getUrl(website, person) {
    if (website.toLowerCase() === 'ancestry') {
        if (src.ancestry.id !== undefined && person.ancestry !== '') {
            return `https://www.ancestry.com/family-tree/person/tree/${src.ancestry.id}/person/${person.ancestry}/facts`;
        }
        return undefined;
    }
    if (website.toLowerCase() === 'familysearch') {
        if (person.familysearch !== '') {
            return `https://www.familysearch.org/tree/person/details/${person.familysearch}`;
        }
        return undefined;
    }
    if (website.toLowerCase() === 'findagrave') {
        if (person.findagrave !== '') {
            return `https://www.findagrave.com/memorial/${person.findagrave}/`;
        }
        return undefined;
    }
}

export function getAllLinks(person) {
    let links = {};

    Object.keys(src).forEach(site => {
        links[site] = {
            "url": getUrl(site, person),
            "default": src[site.toString()].defaultUrl
        }
    })
    
    return links;
}

export function getDefaultUrl(website) {
    return src[website.toLowerCase()].defaultUrl;
}

// DATABASE FUNCTIONS
export function setActive(id) {
    return active = findById(id);
}

export function findByName(name) {
    Object.keys(ids).forEach((id) => {
        if (ids[id].name === name) { return ids[id]; }
    });
    return undefined;
}

export function findById(id) {
    return ids[id] ? ids[id] : undefined;
}

export function findId(person) {
    const keys = Object.keys(ids);
    return keys.find((key) => ids[key] === person);
}

function addPerson(person) {
    if (person.constructor.name === 'Person') { ids[Object.keys(ids).length + 1] = person; }
}

function swapIds(person1, person2) {
    ids[findId(person1)] = person2;
    ids[findId(person2)] = person1;
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
    if (person === undefined) { return }

    const middleInitial = person.middle ? `${person.middle[0]}. ` : '';
    const maidenName = person.maiden ? `(${person.maiden}) ` : '';

    return `${person.first} ${middleInitial}${maidenName}${person.surname}`;
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
    if (person.photo) { return person.photo; }
    return undefined;
}