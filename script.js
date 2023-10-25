// Learn how to import and work with GEDCOM data.
// Person data begins with '0@I*@ INDI', where * = index.
// Person name follows immediately after. '1 NAME "firstname middlename /surname"/'
// Allow users to select ancestor to load. Indexes are 0 for yourself, positives for parents on up and negatives for children and below.

import * as data from './data.js';
import * as ui from './ui.js';
import settings from './settings.json' assert { type: 'json' };

// VARIABLE DECLARATIONS
const info = document.getElementById('info');
const quicklinks = document.getElementById('quicklinks');
const search = document.getElementById('search');
const input = document.getElementById('input');

// TARGETS
window.addEventListener('load', async () => {
    // If autoload is enabled, load the active ancestor. Else load the root ancestor.
    if (settings.autoload) {
        await autoLoad(); // Autoload current ancestor based on active tab.
    } else {
        data.setActive(1);
    }

    renderActive(); //Render the data of the active ancestor.
});

search.addEventListener('submit', (e) => {
    e.preventDefault();
    data.setActive(input.value);
    renderActive(document.querySelector('body'));
    input.value = '';
});

// Query the url for the active tab. If found, return the url. Otherwise return undefined.
async function getUrl() {
    try {
        const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
        if (tab) {
            return tab.url;
        } else {
            console.error('No active tab found.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};

// Automatically load the ancestor from the current url as the active ancestor.
async function autoLoad() {
    let url = await getUrl(); // The current url of the active tab.
    let domain = data.getDomainName(url); // The domain name of the current url.
    let externalId = data.getIdFromUrl(url); // The external ID of the ancestor from the current url.
    //Find internal id from external id, otherwise set to root ancestor.
    let internalId = data.findByExternalId(externalId, domain) != undefined ? data.findByExternalId(externalId, domain) : 1;
    data.setActive(internalId); //Set the active ancestor to the internalId.
}

function renderActive() {
    ui.updateName(data.getFullName(data.active), info.querySelector('#name'));
    ui.updateId(data.findId(data.active), info.querySelector('#id'));
    ui.updateLifespan(data.getBirthYear(data.active), data.getDeathYear(data.active), info.querySelector('#lifespan'));
    ui.updateLinks(data.getAllLinks(data.active), quicklinks);
}