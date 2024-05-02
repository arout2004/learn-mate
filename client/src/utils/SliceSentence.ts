export const sliceSentence = (sentence: any, maxWords: any) => {
  const words = sentence?.split(" ");
  const truncated = words?.slice(0, maxWords);
  const truncatedSentence = `${truncated?.join(" ")}`;

  if (words && words.length > maxWords) {
    return `${truncatedSentence} ...`;
  }

  return truncatedSentence;
};
