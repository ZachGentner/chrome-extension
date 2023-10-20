// Learn how to import and work with GEDCOM data.
// Person data begins with '0@I*@ INDI', where * = index.
// Person name follows immediately after. '1 NAME "firstname middlename /surname"/'
// Allow users to select ancestor to load. Indexes are 0 for yourself, positives for parents on up and negatives for children and below.

import * as data from './data.js';
import * as ui from './ui.js';

// VARIABLE DECLARATIONS
const info = document.getElementById('info');
const quicklinks = document.getElementById('quicklinks');
const search = document.getElementById('search');
const input = document.getElementById('input');

// TARGETS
window.addEventListener('load', () => {
    // Get the name of the website.
    // Check if current url is an ancestor in the database.
    // Map a new array of all relevant IDs based on website name.
    // If so, set that ancestor as active.
    // Otherwise, set the default/root ancestor as active.
    data.setActive(1);
    console.log("Before Autoload: " + data.active.first);
    console.log("Autoload: " + autoLoad());
    data.setActive(2);
    console.log("After Autoload: " + data.active.first);
    renderActive();
}); // Changes default

search.addEventListener('submit', (e) => {
    e.preventDefault();
    data.setActive(input.value);
    renderActive();
    input.value = '';
});

// Automatically load resources for ancestors if the current tab matches one within the database.
//This function throws an error in the fullscreen testing version but not in the popup version.
function autoLoad() {
    let person = 'hello'
    
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        // If the website is a source that can be used to load an person, load the person.
        if (data.getIdFromUrl(tabs[0].url) != undefined) {
            let externalId = data.getIdFromUrl(tabs[0].url); //Extract the external id from the current url.
            console.log(data.findByExternalId(externalId, data.getDomainName(tabs[0].url))); //Search the existing database to see if any person has the external id.
            person = data.findByExternalId(externalId, data.getDomainName(tabs[0].url)); //Search the existing database to see if any person has the external id.
        }
    })

    return person;
}

async function getUrl() {
    let tab = undefined;
    await chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        tab = tabs[0].url.toString();
        console.log(tabs[0].url)
    })
    return tab;
}

function renderActive() {
    ui.updateName(data.getFullName(data.active), info.querySelector('#name'));
    ui.updateId(data.findId(data.active), info.querySelector('#id'));
    ui.updateLifespan(data.getBirthYear(data.active), data.getDeathYear(data.active), info.querySelector('#lifespan'));
    ui.updateLinks(data.getAllLinks(data.active), quicklinks);
}

console.log("getUrl: " + getUrl());