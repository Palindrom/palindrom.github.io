export function fetchAndCacheText(url, expire = 0) {
  const currentTime = Date.now();

  return new Promise(function(resolve, reject) {
    const cachedContent = window.localStorage.getItem(url);
    if (cachedContent) {
      const parsedCachedContent = JSON.parse(cachedContent);
      let isExpired = false;
      if (expire) {
        isExpired = currentTime - parsedCachedContent.timestamp > expire;
      }
      if (!isExpired && parsedCachedContent.text) {
        resolve(parsedCachedContent.text);
        return;
      }
    }
    // snap, not in cache, fetch it
    const headers = new Headers({
      Accept: 'application/vnd.github.VERSION.html'
    });

    fetch(url, { headers, mode: 'cors', redirect: 'follow' })
      .then(function(res) {
         if(res.state > 400) {
            throw URIError();
         } 
         return res => res.text()
      })
      .then(text => {
        //cache it
        window.localStorage.setItem(
          url,
          JSON.stringify({ timestamp: currentTime, text })
        );
        resolve(text);
      })
      .catch(reject);
  });
}
