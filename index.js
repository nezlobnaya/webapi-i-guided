const express = require('express')
const db = require('./data/hubs-model.js')
const server = express()

server.listen(4000, () => {
    console.log('===server listening on port 4000 ===')
})

server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello world')
})

server.get('/hubs', (req, res) => {
    db.find()
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(err => {
        res.status(500).json({
            message: err,
            success: false
        })
    })
})
console.log('Hello World!')

server.post('/hubs', (req, res) => {
    const hubInfo = req.body 
    db.add(hubInfo)
        .then(hub => {
            res.status(201).json({
                success: true,
                hub 
            })
        })
        .catch(err => {
            res.status(500).json({
                success: true, err
            })
        })
})

server.delete('/hubs/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(deletedHub => {
        if(deletedHub) {
            res.status(204).end()
        } else {
            res.status(404).json({
                message: `i could not find id=${id}`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false, err
        })
    })
})

server.put('/hubs/:id', (req, res) => {
    const id = req.params.id;
    const hubInfo = req.body;

    db.update(id, hubInfo)
        .then(hub  => { 
            if(hub) {
                res.status(200).json({success: true, hub})
            } else {
                res.status(404).json({ success: false, message:`id ${id} does not exist`})
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false, err
            })
        })
})