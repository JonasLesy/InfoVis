export function replaceArrayContentWithContentOfOtherArray(
  arrayToReplaceContentFrom,
  arrayWithNewContent
) {
  arrayToReplaceContentFrom.splice(0, arrayToReplaceContentFrom.length);
  arrayWithNewContent.forEach((element) => {
    arrayToReplaceContentFrom.push(element);
  });
}
