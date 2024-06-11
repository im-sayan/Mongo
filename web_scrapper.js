const jsdom = require('jsdom');

async function scrapeSite(link) {
    const { JSDOM } = jsdom;

  const dom = await JSDOM.fromURL(link);

  const { window } = dom;

  const { document } = window;

//   await window.fetch(link);
//   await window.document.readyState === 'complete';

  const results = [];
  document.querySelectorAll('table.RntSmf').forEach((table) => {
    const image = table.querySelector('img').src;
    const text = table.querySelector('span').textContent;
    results.push({ image, text });
  });

  return results;
}

scrapeSite('https://www.carandbike.com/new-cars/models').then((results) => {
  console.log(results);
}).catch((error) => {
  console.error(error);
});