const express = require('express')
const router = express.Router()
const Player = require('../models/player')
// All Players Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const players = await Player.find(searchOptions)
      res.render('players/index', {
        players: players,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })
// New Player Route
router.get('/new', (req, res) => {
    res.render('players/new', { player: new Player()})
  })
// Create Player Route
router.post('/', async(req, res) => {
    const player = new Player ({
        name: req.body.name,
        rank: req.body.rank,
        score: req.body.score,
        time: req.body.time,
        game: req.body.game,
        status: req.body.status

    })
    try {
      const newPlayer = await player.save()
      // res.redirect(`players/${newPlayer.id}`)
      res.redirect(`players`)
    } catch {
      res.render('players/new', {
        player: player,
        errorMessage: 'Error creating Player'
      })
    }
  })
  router.get('/:id', (req, res)=> {
    res.send('Show Player' + req.params.id)
  })

router.get('/:id/edit', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
    res.render('players/edit', { player: player })
  } catch {
    res.redirect('/players')
  }
})

router.put('/:id', async (req, res) => {
  let player
  try {
    player = await Player.findById(req.params.id)
  //  player.name = req.body.name
    player.name= req.body.name,
    player.rank= req.body.rank,
    player.score= req.body.score,
    player.time= req.body.time,
    player.game= req.body.game,
    player.status= req.body.status
    await player.save()
    res.redirect(`/players`)
    //res.redirect(`/players/${player.id}`)
  } catch {
    if (player == null) {
      res.redirect('/')
    } else {
      res.render('players/edit', {
        player: player,
        errorMessage: 'Error updating Player'
      })
    }
  }
})

router.delete('/:id', async (req, res) => {
  let player
  try {
    player = await Player.findById(req.params.id)
    await player.remove()
    res.redirect('/players')
  } catch {
    if (player == null) {
      res.redirect('/')
    } else {
      res.redirect(`/players/${player.id}`)
    }
  }
})

/*
  router.get('/:id/edit', (req, res)=> {
    res.send('Edit Player' + req.params.id)
  })
  
  router.put('/:id/edit', (req, res)=> {
    res.send('Update Player' + req.params.id)
  })
 
  router.delete('/:id/', (req, res)=> {
    res.send('Delete Player' + req.params.id)
  })
  */
  module.exports = router