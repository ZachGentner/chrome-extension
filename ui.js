export function updateName(fullName, element) {
    return element.innerText = fullName;
}

export function updateId(id, element) {
    return element.innerText = `ID: ${id}`;
}

export function updateLifespan(birth, death, element) {
    if (birth === undefined && death === undefined) { return element.innerText = 'No dates' }

    const birthYear = birth != undefined ? birth : ''
    const deathYear = death != undefined ? death : ''

    return element.innerText = `${birthYear} - ${deathYear}`;
}

export function updateLinks(links, element) {
    if (links['ancestry'].url === undefined) {
        element.querySelector('#ancestry').querySelector('a').href = links['ancestry'].default;
        element.querySelector('#ancestry').disabled = true;
    } else {
        element.querySelector('#ancestry').querySelector('a').href = links['ancestry'].url;
        element.querySelector('#ancestry').disabled = false;
    }

    if (links['familysearch'].url === undefined) {
        element.querySelector('#familysearch').querySelector('a').href = links['familysearch'].default;
        element.querySelector('#familysearch').disabled = true;
    } else {
        element.querySelector('#familysearch').querySelector('a').href = links['familysearch'].url;
        element.querySelector('#familysearch').disabled = false;
    }
    
    if (links['findagrave'].url === undefined) {
        element.querySelector('#findagrave').querySelector('a').href = links['findagrave'].default;
        element.querySelector('#findagrave').disabled = true;
    } else {
        element.querySelector('#findagrave').querySelector('a').href = links['findagrave'].url;
        element.querySelector('#findagrave').disabled = false;
    }
}

// Opens a new tab with the url passed as an argument.
export function openNewTab(url) {
    return window.open(url, '_blank').focus();
}

// function updatePhoto(photoUrl, photoFrame) {
//     if (photoUrl !== '' && photoUrl !== undefined) {
//         const img = document.createElement('img');
//         img.src = photoUrl;
//         photoFrame.querySelector('i').remove();
//         photoFrame.appendChild(img);
//     } else if (!document.querySelector('#profile').querySelector('i')) {
//         const icon = document.createElement('i');
//         icon.className = 'fa-regular fa-user fa-lg';
//         photoFrame.appendChild(icon);
//     }
// }