import axios from "axios";

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

export default {
  // Gets all articles in the db
  getArticles: function() {
    return axios.get("/api/saved");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/saved" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/saved", articleData);
  },
  // gets the queried articles from the New York Times api
  nytSearch: function (queryTopic) {
    return axios.get(`${queryURLBase}${queryTopic}`);
   
  }
}

