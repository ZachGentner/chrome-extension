// Check if the chrome namespace is available
if (typeof chrome !== 'undefined') {
  // Add an event listener for when the extension is installed or updated
  chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    chrome.contextMenus.create({
      id: 'ancestry',
      title: 'ancestry',
      contexts: ['page', 'selection', 'link', 'image', 'video', 'audio'],
    });
    chrome.contextMenus.create({
      id: 'FamilySearch',
      title: `${chrome.tabs.getCurrent}`,
      contexts: ['page', 'selection', 'link', 'image', 'video', 'audio'],
    });
  });

  // Add a listener for when the context menu item is clicked
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'ancestry') {
      // Handle the context menu click
      console.log('Context menu clicked!');
      console.log('Selected text:', info.selectionText);
    }
  });
} else {
  console.error('Chrome extension API not available.');
}
