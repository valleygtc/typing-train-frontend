import config from './config';
const { BACKEND_PREFIX } = config;


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


/**
 * @param {number} id 
 * @return {object} article
 */
const fetchArticle = async (
  id,
) => {
  const resp = await get(`${BACKEND_PREFIX}/api/articles/${id}`);
  if (resp.status !== 200) {
    console.error('Error: %o', { resp });
    throw new Error('resp status !== 200')
  }

  const respJSON = await resp.json();
  return respJSON.data;
}


export {
  get,
  post,
  fetchArticle,
};
