// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        return fetch(url)
            .then(r => r.json())
            .then(r => {
                var cor = {}
                r.articles.forEach(function(article){
                    cor[article._id] = article.text.split(" ").length
                })
                return cor
            });
    }

    function countWordsSafe(url) {
        return fetch(url)
            .catch(e => {return {}});
    }

    function getLargest(url) {
        return fetch(url)
            .then(r => r.json())
            .then(r => {
                var id, len
                var maxnum = 0
                r.articles.forEach(function(article){
                    len = article.text.split(" ").length;
                    if(maxnum < len){
                        id = article._id
                        maxnum = len
                    }
                })
                return id.toString()
            })
    }

    exports.inclass = {
        author: "Chenlai Zhang",
        countWords, countWordsSafe, getLargest
    }

})(this);