var express = require('express');
var Game = require('./model');

var app = express.Router();

//hosts only 1 game session -> expand (constraint: max player-count per room)
var game = new Game();

module.exports = app
    .get('/quotes', (req, res) => res.send(game.GetQuotes(req.query.playerId)))
    .get('/state', (req, res) => res.send(game))
    .post('/picture', (req, res) => res.send( game.FlipPicture() ))
    .post('/quotes', (req, res) => {
        console.log(req.body); 
        game.SubmitQuote(req.body.Text, req.body.PlayerId);
        res.send( { success: true } );
    })
