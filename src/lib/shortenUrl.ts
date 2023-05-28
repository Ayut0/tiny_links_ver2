const shortenUrl = (url: string, length: number) => {
  const shortenedUrl: string = Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((n) => url[n % url.length])
    .join('');

  return shortenedUrl;
};

export default shortenUrl;
