//Learn how to import and work with GEDCOM data.
//Person data begins with '0@I*@ INDI', where * = index.
//Person name follows immediately after. '1 NAME "firstname middlename /surname"/'
//Allow users to select ancestor to load. Indexes are 0 for yourself, positives for parents on up and negatives for children and below.

import * as data from './data.mjs';
import * as ui from './ui.mjs';

//VARIABLE DECLARATIONS
const info = document.getElementById('info');
const quicklinks = document.getElementById('quicklinks');
const toolbar = document.getElementById('toolbar');
const input = document.getElementById('input')
let active = data.findById(1);

//TARGETS
toolbar.querySelector('#test').addEventListener('mousedown', () => {
    changeActive(input.value)
})


function updateName() {
    if (active !== undefined) {
        info.querySelector('#name').innerText = data.getFullName(active);
    } else {
        info.querySelector('#name').innerText = "UNKNOWN PERSON";
    }
}

function updateLinks(){
    //Iterate through all available links within the hotbar. Taking their names and updating them as necessary.
    //Diable all links if active person does not exist or is null.


    if (quicklinks.querySelector('#ancestry') !== null && active.ancestry !== '') {
        quicklinks.querySelector('#ancestry').querySelector("a").href = data.getUrl("ancestry", active);
        quicklinks.querySelector('#ancestry').disabled = false;
    } else {
        quicklinks.querySelector('#ancestry').querySelector("a").href = 'https://www.ancestry.com';
        quicklinks.querySelector('#ancestry').disabled = true;
    }

    if (quicklinks.querySelector('#familysearch') !== null && active.familysearch !== '') {
        quicklinks.querySelector('#familysearch').querySelector("a").href = data.getUrl("familysearch", active);
        quicklinks.querySelector('#familysearch').disabled = false;
    } else {
        quicklinks.querySelector('#familysearch').querySelector("a").href = data.getDefaultUrl('familysearch');
        quicklinks.querySelector('#familysearch').disabled = true;
    }

    if (quicklinks.querySelector('#findagrave') !== null && active.findagrave !== '') {
        quicklinks.querySelector('#findagrave').querySelector("a").href = data.getUrl("findagrave", active);
        quicklinks.querySelector('#findagrave').disabled = false;
    } else {
        quicklinks.querySelector('#findagrave').querySelector("a").href = 'https://www.findagrave.com';
        quicklinks.querySelector('#findagrave').disabled = true;
    }

    // console.log(quicklinks.querySelector('#ancestry').querySelector('a').href)
    // console.log(quicklinks.querySelector('#findagrave').querySelector('a').href)
    // console.log(quicklinks.querySelector('#familysearch').querySelector('a').href)
}

function changeActive(id) {
    active = data.findById(id);
    updateName();
    updateLinks();
    console.log(active)
}

changeActive(1);