// Check if the chrome namespace is available
if (typeof chrome !== 'undefined') {
  // Add an event listener for when the extension is installed or updated
  chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    chrome.contextMenus.create({
      id: 'rootwise',
      title: 'rootwise',
      contexts: ['page', 'selection', 'link', 'image', 'video', 'audio'],
    });
  });

  // Add a listener for when the context menu item is clicked
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'rootwise') {
      // Handle the context menu click
      // const url = await getUrl();
      // console.log(getIdFromUrl(url));
      // data = getIdFromUrl(url);
    }
  });
} else {
  console.error('Chrome extension API not available.');
}

// async function getUrl() {
//   try {
//     const [tab] = await chrome.tabs.query({
//       currentWindow: true,
//       active: true,
//     });
//     if (tab) {
//       return tab.url;
//     } else {
//       console.error('No active tab found.');
//       return null;
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//     return null;
//   }
// }

// function getIdFromUrl(url) {
//   let id;

//   if (url) {
//     if (url.includes('ancestry')) {
//       id = url.match(/\/person\/(\d+)\//)
//         ? url.match(/\/person\/(\d+)\//)[1]
//         : src.ancestry.defaultUrl;
//     }
//     if (url.includes('familysearch')) {
//       id = url.match(/([^/]+)$/)
//         ? url.match(/([^/]+)$/)[1]
//         : src.familysearch.defaultUrl;
//     }
//     if (url.includes('findagrave')) {
//       id = url.match(/\/(\d+)\//)
//         ? url.match(/\/(\d+)\//)[1]
//         : src.findagrave.defaultUrl;
//     }
//   }

//   return id;
// }
