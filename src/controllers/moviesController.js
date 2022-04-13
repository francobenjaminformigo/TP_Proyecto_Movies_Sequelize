const db = require('../database/models');
const sequelize = db.sequelize;
let fs = require('fs');
let path = require('path');
let { validationResult } = require('express-validator');

//Otra forma de llamar a los modelos
/* const Movies = db.Movie; */

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
            .catch(err => {
                res.send(err)
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            })
            .catch(err => {
                res.send(err)
            })
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            })
            .catch(err => {
                res.send(err)
            })
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            })
            .catch(err => {
                res.send(err)
            })
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd')
    },
    create: function (req, res) {
        let errors = validationResult(req)
        const {title, rating, awards, release_date, length} = req.body
        if (errors.isEmpty()) {
            db.Movie.create(
                {
                    title,
                    rating,
                    length,
                    awards,
                    release_date
                }
            )
                .then((movie) => {
                    res.redirect('/movies')
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            res.render('moviesAdd', {
                errors: errors.mapped(),
                old: req.body
            })
        }

    },
    edit: function(req, res) {
        db.Movie.findByPk(req.params.id)
            .then((Movie) => {
                res.render('moviesEdit', {Movie})
            })
            .catch(err => {
                res.send(err)
            })
    },
    update: function (req,res) {
        const {title, rating, awards, release_date, length} = req.body
        db.Movie.update(
            {
                title,
                rating,
                length,
                awards,
                release_date
              },
             {
                where: { id: req.params.id }
             }
             )
             .then((movie) => {
                 if(movie){
                     res.redirect('/movies')
                 }
             })
             .catch(err => {
                res.send(err)
            })
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then((movie) => {
                if(movie){
                    res.render('moviesDelete', {movie})
                }
            })
    },
    destroy: function (req, res) {
        db.Movie.delete(
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then((movie) => {
                res.redirect('/')
            })
    }

}

module.exports = moviesController;