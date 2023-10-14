const moviesModel = require('../models/movies.js');
const express = require('express');
const upload = require('../upload.js');
const multer = require('multer');
const path = require('path');


// Method GET
const moviesController = {
    
getMoviesAll: (req, res) => {
moviesModel.getAllMovies((err, movies) => {
    if (err) {
        console.log(err);
       return res.status(404).json( {message: "Data Tidak Ditemukan!"} )
    }
    res.status(200).render('moviesAll', {movies: movies.rows});
    // console.log(movies);
    })
},

// Method POST
createMovies: (req, res) => {
    
    upload.upload.single('photo')(req, res, (err) => {
        if (err instanceof multer.MulterError) { 
            return res.status(500).send(err.message);
        } else if (err) {
            return res.status(500).send(err.message);
        }

    const {title, genres, year} = req.body;
    const filePhoto = req.file ? req.file.path: '';
    const photo = filePhoto.replace(/upload\\img\\/, 'img/');
    const movieData = {
        title,
        genres,
        year,
        photo
    }

    if(!movieData.title || !movieData.genres || !movieData.year || !movieData.photo) {
        res.status(400);
        res.json( {message: "Bad Request"} );
    }

moviesModel.createMovie(movieData, (err, result) => {
    if (err){
        console.log(err);
        return res.status(500).json( {message: "Terjadi Kesalahan Server"} )
    }
    console.log( {message: "Insert Movie Success!", movies: result.rows[0]} );
    })
    res.status(200).redirect('/movies')
}) 
},

showCreateMovie: (req, res) => {
    res.render('moviesCreate');
},

// Method PUT
updateMovies: (req, res) => {

    upload.upload.single('photo')(req, res, (err) => {
        if (err instanceof multer.MulterError) { 
            return res.status(500).send(err.message);
        } else if (err) {
            return res.status(500).send(err.message);
        }
    
    const movieId = req.params.id;
    const {title, genres, year} = req.body;
    const filePhoto = req.file ? req.file.path: '';
    const photo = filePhoto.replace(/upload\\img\\/, 'img/')
    const movieData = {
        title,
        genres,
        year,
        photo
    }
    if(!movieData.title || !movieData.genres || !movieData.year || !movieData.photo) {
        res.status(400);
        res.json( {message: "Bad Request"} );
    }

moviesModel.updateMovie(movieId, movieData, (err, result) => {
    if (err){
        console.log(err);
        return res.status(500).json( {message: "Terjadi Kesalahan Server"} )
    }
    console.log( {message: "Update Movie Success!", movies: result.rows[0]} )
    })
    res.status(200).redirect('/movies')
    })
},

showUpdateMovie: (req, res) => {
    const movieId = req.params.id;
    moviesModel.getMoviesById(movieId, (err, movies) => {
        if (err) {
            console.log(err);
           return res.status(404).json( {message: "Data Tidak Ditemukan!"} )
        }
        res.status(200).render('moviesUpdate', { movies : movies.rows[0]});
        console.log(movies.rows);
        })
    
}, 

// Method Delete
deleteMovies: (req, res) => {
    const movieId = req.params.id;

moviesModel.deleteMovies(movieId, (err, result) => {
    if (err) {
        console.log(err);
        return res.status(500).json( {message: "Terjadi Kesalahan Server"} );
    }
    console.log( {message: "Delete Movie Success!", movies: result.rows[0]} )
    })
    res.redirect('/movies');
}

}

module.exports = moviesController;