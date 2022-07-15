export const getYoutubeVideoId = (youtubeVideoUrl: string | undefined | null) => {
  if (!youtubeVideoUrl) {
    return null;
  }

  // Extract the youtube video id from the url
  // https://regexr.com/531i0
  const regexMatch = youtubeVideoUrl.match(/(?:\/|%3D|v=|vi=)([0-9A-z-_]{11})(?:[%#?&]|$)/);
  return regexMatch && regexMatch.length > 1 ? regexMatch[1] : null;
};
