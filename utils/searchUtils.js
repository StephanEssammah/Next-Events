import { compareTwoStrings } from "string-similarity";

export const sortEventsBySimilarity = (search, events) => {
  const eventsWithSimilarity = [];

  events.forEach((event, index) => {
    if (
      compareTwoStrings(search.toLowerCase(), event.title.toLowerCase()) > 0 &&
      index < 10
    ) {
      eventsWithSimilarity.push({
        ...event,
        similarity: compareTwoStrings(search, event.title),
      });
    }
  });

  const sortedEvents = eventsWithSimilarity.sort((a, b) => {
    return b.similarity - a.similarity;
  });
  return sortedEvents;
};
