// Add quick search options based on the current active ancestor for common genealogical websites.
export function searchForebears(person) {
  if (person.maiden !== '' && person.maiden !== undefined) {
    return `https://forebears.io/surnames/${person.maiden}`;
  }
  return `https://forebears.io/surnames/${person.surname}`;
}

export function searchAncestry(person) {}
