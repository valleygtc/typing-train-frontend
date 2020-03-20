/**get with cookie
 * 
 * Params:
 *   url [String]
 *   params [Object]
 * Return:
 *   [Promise]: return [Response]
 */
function get(url, params={}) {
  const urlO = new URL(url);

  for (const [k, v] of Object.entries(params)) {
    urlO.searchParams.append(k, v);
  }
  console.log('get: %o', { urlO });
  return fetch(urlO.href, {
    mode: 'cors',
    credentials: 'include',
  });
}


/**JSON post with cookie
 * 
 * Params:
 *   url [String]
 *   body [Object]:
 * Return:
 *   [Promise]: return [Response]
 */
function post(url, body={}) {
  console.log('post: %o', { url, body });
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
    credentials: 'include',
  });
}


export {
  get,
  post,
};
