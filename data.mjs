const src = {
    ancestry: {
        defaultUrl: 'https://www.ancestry.com',
        id: '178204157',
        root: '352320388648'
    }, 
    familysearch: {
        defaultUrl: 'https://www.familysearch.org',
        id: 'L2Y8-T2J',
    },
    findagrave: {
        defaultUrl: 'https://www.findagrave.com',
        id: '1057635',
    },
}

 const ids = {
    1:{
        first: "Julius",
        middle: "",
        surname: "Caesar",
        ancestry: "",
        familysearch: "",
        findagrave: "7181",
        links: {},
    },
    2:{
        first: "Louis",
        middle: "Napoleon",
        surname: "Bonaparte",
        ancestry: "",
        familysearch: "",
        findagrave: "7414"
    },
}

//HOMEPAGE FUNCTIONS. DEFAULT LINKS TO COMMONLY USED NAVIGATION PAGES.
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

//GENERATE URLS
export function getUrl(website, person) {

    if (website.toLowerCase() === 'ancestry') {
        if (src.ancestry.id !== undefined && person.ancestry !== '') {
            return `https://www.ancestry.com/family-tree/person/tree/${src.ancestry.id}/person/${person.ancestry}/facts`;
        } else {
            return src.ancestry.defaultUrl;
        }
    }
    if (website.toLowerCase() === 'familysearch') {
        if (person.familysearch !== '') {
            return `https://www.familysearch.org/tree/person/details/${person.familysearch}`;
        } else {
            return src.familysearch.defaultUrl;
        }
    }
    if (website.toLowerCase() === 'findagrave') {
        if (person.findagrave !== '') {
            return `https://www.findagrave.com/memorial/${person.findagrave}/`;
        } else {
            return src.findagrave.defaultUrl;
        }
    }
}

export function getDefaultUrl(website) {
    if(src[website].defaultUrl) {
        return src[website].defaultUrl;
    }
}

//FIND PEOPLE IN DATABASE
export function findByName(name) {
    Object.keys(ids).forEach(id => {
        if (ids[id].name === name) {
            return ids[id];
        }
    });
};

export function findById(id) {
    if (ids[id] !== undefined) {
        return ids[id];
    }
};

function getAllNames(){
    Object.keys(ids).forEach(id => {
        console.log(getFullName(ids[id]));
    })
}

//SEARCH ONLINE RESOURCES
// function search(website, person) {
//     if (website.toLowerCase() === 'ancestry') {
         
//     }
//     if (website.toLowerCase() === 'familysearch') {
        
//     }
//     if (website.toLowerCase() === 'findagrave') {

//     }
// }

//NAME FUNCTIONS
export function getFullName(person) {
    let middleInitial = person.middle ? `${person.middle[0]}. ` :  "";
    let maidenName = person.maiden ? ` (${person.maiden}) ` :  "";

    return `${person.first} ${middleInitial}${maidenName}${person.surname}`;
}

getAllNames();