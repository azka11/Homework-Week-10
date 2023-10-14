const pool = require('../config/database.js');

const moviesModel = {

// Method GET
getAllMovies: (callback) => {
    pool.query(`SELECT * FROM movies`, callback);
},

getMoviesById: (movieId, callback) => {
    pool.query(`SELECT * FROM movies WHERE id = '${movieId}'`, callback);
},

// Method POST
createMovie: (movieData, callback) => {
    const {title, genres, year, photo} = movieData;

    pool.query(`INSERT INTO movies(title, genres, year, photo) VALUES ($1, $2, $3, $4) RETURNING *`, [title, genres, year, photo], callback)
},

// Method PUT
updateMovie: (movieId, movieData, callback) => {
    let {title, genres, year, photo} = movieData;
    
    pool.query(`UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5 RETURNING *`, [title, genres, year, photo, movieId], callback);
},

// Method Delete
deleteMovies: (movieId, callback) => {
 pool.query(`DELETE FROM movies WHERE id = $1 RETURNING *`, [movieId], callback);
}

};

module.exports = moviesModel;