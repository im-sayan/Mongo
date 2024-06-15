const axios = require('axios');
const cheerio = require('cheerio');

async function getTechnologies(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const technologies = [];

    // Get meta tags
    $('meta').each((index, element) => {
      const metaTag = $(element).attr('name') || $(element).attr('property');
      if (metaTag) {
        technologies.push(metaTag);
      }
    });

    // Get script tags
    $('script').each((index, element) => {
      const scriptTag = $(element).attr('src');
      if (scriptTag) {
        technologies.push(scriptTag);
      }
    });

    // Get link tags
    $('link').each((index, element) => {
      const linkTag = $(element).attr('href');
      if (linkTag) {
        technologies.push(linkTag);
      }
    });

    // Get technologies from HTML comments
    const htmlComments = $('*').contents().filter(function() {
      return this.nodeType === 8;
    }).map(function() {
      return this.nodeValue;
    }).get();

    htmlComments.forEach(comment => {
      const matches = comment.match(/(javascript|css|html|react|angular|vue|jquery|bootstrap|materialize|foundation|etc.)/gi);
      if (matches) {
        technologies.push(...matches);
      }
    });

    return technologies;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const url = 'https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b';

async function main() {
  const technologies = await getTechnologies(url);
  console.log(technologies);
}

main();