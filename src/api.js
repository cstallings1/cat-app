import { CORS_PROXY, CAT_API_KEY } from './constants';

export const fetchImages = () => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          return alert('There was an issue getting cat data.');
        }

        // parse xml to get all the ids and image urls
        let parser = new DOMParser();
        let mlDoc = parser.parseFromString(xhr.response, 'text/xml');
        const urlNodes = mlDoc.getElementsByTagName('url');
        const idNodes = mlDoc.getElementsByTagName('id');

        const imgObjArray = Array.from(urlNodes).map((node, index) => {
          return {
            url: node.innerHTML,
            id: idNodes[index].innerHTML,
          };
        });
        resolve(imgObjArray);
      }
    }
    xhr.open('GET', `${CORS_PROXY}/http://thecatapi.com/api/images/get?format=xml&results_per_page=25`, true);
    xhr.setRequestHeader('x-api-key', CAT_API_KEY);
    xhr.send('');
  })
}

export const fetchFacts = () => {
  return fetch(`${CORS_PROXY}/https://catfact.ninja/facts?limit=25`)
    .then((response) => {
      return response.json();
    }, (err) => {
      return alert('There was an issue getting cat data.');
    });
}