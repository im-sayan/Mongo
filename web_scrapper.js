const cheerio = require('cheerio');
const request = require('request');

// URL to scrape
const url = 'https://portfolio-4911e.web.app/';

// Send a GET request to the URL
request(url, (error, response, html) => {
  if (error) {
    console.error(error);
    return;
  }

  // Load the HTML into Cheerio
  const $ = cheerio.load(html);

  // Extract the title of the page
  const title = $('title').text();
  console.log(`Title: ${title}`);

  // Extract all the links on the page
  const links = $('a[href]');
  links.each((index, element) => {
    const link = $(element).attr('href');
    console.log(`Link ${index + 1}: ${link}`);
  });

  // Extract all the images on the page
  const images = $('img[src]');
  images.each((index, element) => {
    const image = $(element).attr('src');
    console.log(`Image ${index + 1}: ${image}`);
  });
});