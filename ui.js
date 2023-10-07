import * as data from './data.js';

// export function updateName() {
//     if (data.active !== undefined) {
//         info.querySelector('#name').innerText = data.getFullName(data.active);
//     } else {
//         info.querySelector('#name').innerText = "UNKNOWN PERSON";
//     }
// }

// export function updateLinks(){
//     //Iterate through all available links within the hotbar. Taking their names and updating them as necessary.
//     //Disable all links if active person does not exist or is null.

//     if (quicklinks.querySelector('#ancestry') !== null && active != undefined && active.ancestry !== '') {
//         quicklinks.querySelector('#ancestry').querySelector("a").href = data.getUrl("ancestry", active);
//         quicklinks.querySelector('#ancestry').disabled = false;
//     } else {
//         quicklinks.querySelector('#ancestry').querySelector("a").href = 'https://www.ancestry.com';
//         quicklinks.querySelector('#ancestry').disabled = true;
//     }

//     if (quicklinks.querySelector('#familysearch') !== null && active != undefined && active.familysearch !== '') {
//         quicklinks.querySelector('#familysearch').querySelector("a").href = data.getUrl("familysearch", active);
//         quicklinks.querySelector('#familysearch').disabled = false;
//     } else {
//         quicklinks.querySelector('#familysearch').querySelector("a").href = data.getDefaultUrl('familysearch');
//         quicklinks.querySelector('#familysearch').disabled = true;
//     }

//     if (quicklinks.querySelector('#findagrave') !== null && active != undefined && active.findagrave !== '') {
//         quicklinks.querySelector('#findagrave').querySelector("a").href = data.getUrl("findagrave", active);
//         quicklinks.querySelector('#findagrave').disabled = false;
//     } else {
//         quicklinks.querySelector('#findagrave').querySelector("a").href = 'https://www.findagrave.com';
//         quicklinks.querySelector('#findagrave').disabled = true;
//     }

// window.location.href === active.links? then load user as active?
