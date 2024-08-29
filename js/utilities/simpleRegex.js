// Find a fragment anywhere in the string
function findFragmentAnywhere(term, stringToSearch) {
  const regex = new RegExp(term, "i");
  return regex.test(stringToSearch);
}

// Find a fragment at the start of the string
function findFragmentAtStart(term, stringToSearch) {
  const regex = new RegExp(`^${term}`, "i");
  return regex.test(stringToSearch);
}

// Find a fragment at the end of the string
function findFragmentAtEnd(term, stringToSearch) {
  const regex = new RegExp(`${term}$`, "i");
  return regex.test(stringToSearch);
}

// Find a whole word in the string
function findWholeWord(word, stringToSearch) {
  const regex = new RegExp(`\\b${word}\\b`, "i");
  return regex.test(stringToSearch);
}

// Count occurrences of a fragment in the string
function countOccurrences(term, stringToSearch) {
  const regex = new RegExp(term, "gi");
  const matches = stringToSearch.match(regex);
  return matches ? matches.length : 0;
}
