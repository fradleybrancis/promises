/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGihubProfileAsync = require('./promisification').getGitHubProfileAsync;
var chaining = require('./callbackReview.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return Promise.promisify(chaining.pluckFirstLineFromFile)(readFilePath)
  .then((data) => {
    return Promise.promisify(getGihubProfileAsync)(data.toString());
  })
  .then((data) => {
    console.log('this is the result: ' +  data.toString());
    return Promise.promisify(fs.writeFile)(writeFilePath, JSON.stringify(data));
  })
  
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
