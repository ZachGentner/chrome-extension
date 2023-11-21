import * as data from './data.js';

export function updateName(person, element) {
  const firstName = person.first ? `${person.first} ` : '';
  const middleInitial = person.middle ? `${person.middle[0]}. ` : '';
  const maidenName = person.maiden ? `(${person.maiden}) ` : '';
  const lastName = person.surname ? `${person.surname}` : '';

  return (element.innerText = `${firstName}${middleInitial}${maidenName}${lastName}`);
}

export function updateId(id, element) {
  return (element.innerText = `ID: ${id}`);
}

export function updateLifespan(birth, death, element) {
  if (birth === undefined && death === undefined) {
    return (element.innerText = 'No dates');
  }

  const birthYear = birth !== undefined ? birth : '';
  const deathYear = death !== undefined ? death : '';

  return (element.innerText = `${birthYear} - ${deathYear}`);
}

export function updateLinks(links, element) {
  if (links.ancestry.url === undefined) {
    element.querySelector('#ancestry').querySelector('a').href =
      links.ancestry.default;
    element.querySelector('#ancestry').disabled = true;
  } else {
    element.querySelector('#ancestry').querySelector('a').href =
      links.ancestry.url;
    element.querySelector('#ancestry').disabled = false;
  }

  if (links.familysearch.url === undefined) {
    element.querySelector('#familysearch').querySelector('a').href =
      links.familysearch.default;
    element.querySelector('#familysearch').disabled = true;
  } else {
    element.querySelector('#familysearch').querySelector('a').href =
      links.familysearch.url;
    element.querySelector('#familysearch').disabled = false;
  }

  if (links.findagrave.url === undefined) {
    element.querySelector('#findagrave').querySelector('a').href =
      links.findagrave.default;
    element.querySelector('#findagrave').disabled = true;
  } else {
    element.querySelector('#findagrave').querySelector('a').href =
      links.findagrave.url;
    element.querySelector('#findagrave').disabled = false;
  }
}

// Opens a new tab with the url passed as an argument.
export function openNewTab(url) {
  return window.open(url, '_blank').focus();
}

// Updates the info bar with information about the active person.
export function renderActive(element) {
  updateName(
    data.active,
    element.querySelector('#info').querySelector('#name'),
  );
  updateId(
    data.findId(data.active),
    element.querySelector('#info').querySelector('#id'),
  );
  updateLifespan(
    data.active.birth,
    data.active.death,
    element.querySelector('#info').querySelector('#lifespan'),
  );
  updateLinks(
    data.getAllLinks(data.active),
    element.querySelector('#quicklinks'),
  );
}

// Creates filtered search results based on which people meet the input criteria.
export function filterResults(people, search, element) {
  if (people.length >= 1) {
    people.forEach((id) => {
      const person = document.createElement('li'); // Create a new list item for the person.
      person.setAttribute('id', data.findId(id));

      // Add an onclick event listener for the element.
      person.addEventListener('click', () => {
        data.setActive(person.getAttribute('id')); // Set the element id to the person id.
        renderActive(element.parentElement); // Render active passing in body element.
        person.parentElement.style.display = 'none'; // Hide the results menu.
        person.parentElement.parentElement.querySelector('#input').value = '';
        person.parentElement.innerHTML = ''; // Clear the results menu.
      });

      if (id.maiden !== undefined || id.maiden !== '') {
        const birthSurname =
          id.maiden.toLowerCase().startsWith(search.toLowerCase()) &&
          id.maiden.length >= 1
            ? id.maiden
            : id.surname;
        let middlename = id.middle ? id.middle : ''; // Only add middlename if it exists
        person.innerText = `${birthSurname}, ${id.first} ${middlename}`;
        element.appendChild(person);
      }
    });
  }
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
