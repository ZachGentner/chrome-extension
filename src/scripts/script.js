// IMPORTS
import * as data from './data.js';
import * as ui from './ui.js';
import settings from '../settings.json' assert { type: 'json' };
import * as person from './person.js';

// VARIABLES
const info = document.getElementById('info');
const quicklinks = document.getElementById('quicklinks');
const search = document.getElementById('search');
const input = document.getElementById('input');
const edit = document.getElementById('edit');

if (settings.autofocus) {
  input.setAttribute('autofocus', '');
}

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
  results.innerHTML = '';
  ui.filterResults(data.searchByName(input.value), '', results); // Filter the results based on an empty string.
});

// If searchbar is in focus, show results menu.
input.addEventListener('focus', (e) => {
  const results = document.querySelector('#results'); // Query the results element.
  results.style.display = 'block'; // Display the search results element.
  results.scrollTo(0, 0); // Returns scrollbar to the top of the list.
  ui.filterResults(data.searchByName(input.value), '', results); // Filter the results based on an empty string.

  // Updates results with relevant query data.
  input.addEventListener('input', (e) => {
    results.innerHTML = ''; // Remove all children from results.
    ui.filterResults(data.searchByName(input.value), input.value, results); // Filter results displayed.
  });

  // Load an ancestor as active if they're clicked from results menu.

  // // If searchbar loses focus, hide results menu.
  input.addEventListener('blur', (e) => {
    setTimeout(() => {
      results.innerHTML = ''; // Clear the results.
      input.value = ''; // Clear the search bar.
      results.style.display = 'none';
    }, '150');
  });
});

edit.addEventListener('click', () => {
  console.log('test');
});

// FUNCTIONS
// Query the url for the active tab. If found, return the url. Otherwise return undefined.
async function getUrl() {
  try {
    const [tab] = await chrome.tabs.query({
      currentWindow: true,
      active: true,
    });
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
}

// Automatically load the ancestor from the current url as the active ancestor.
async function autoLoad() {
  let url = await getUrl(); // The current url of the active tab.
  let domain = data.getDomainName(url); // The domain name of the current url.
  let externalId = data.getIdFromUrl(url); // The external ID of the ancestor from the current url.
  //Find internal id from external id, otherwise set to root ancestor.
  let internalId =
    data.findByExternalId(externalId, domain) != undefined
      ? data.findByExternalId(externalId, domain)
      : 1;
  data.setActive(internalId); //Set the active ancestor to the internalId.
}

function renderActive() {
  ui.updateName(data.active, info.querySelector('#name'));
  ui.updateId(data.findId(data.active), info.querySelector('#id'));
  ui.updateLifespan(
    data.active.birth,
    data.active.death,
    info.querySelector('#lifespan'),
  );
  ui.updateLinks(data.getAllLinks(data.active), quicklinks);
}
