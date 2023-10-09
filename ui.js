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

// function updatePhoto() {
//     if (data.getPhoto !== '' && data.getPhoto !== undefined) {
//         const img = document.createElement('img');
//         img.src = data.getPhoto(data.active);
//         info.querySelector('#profile').querySelector('i').remove();
//         info.querySelector('#profile').appendChild(img);
//     } else if (!document.querySelector('#profile').querySelector('i')) {
//         const icon = document.createElement('i');
//         icon.className = 'fa-regular fa-user fa-lg';
//         document.querySelector('#profile').appendChild(icon);
//     }
// }