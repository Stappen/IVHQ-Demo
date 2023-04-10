// Use fetch to simulate retrieving data from a server
// Get data from the local data file and parse it into a JavaScript object
fetch('https://gist.githubusercontent.com/xavierperera/4865fcf80fe93fcefac0b846bad0e98b/raw/aa40a9305697c8b2f1a9cbb8a16a3ca44362734f/ivhq-fed-test.json')
  .then(response => response.json())
  .then(data => {
    createSideBar(data, 0);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });