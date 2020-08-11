const Board = require('../models/board.model')
const _handleResponse = require('./handler')

module.exports = {
    getAll (req, res) {
        Board.find({}, 'title', (err, boards) => {
            _handleResponse(err, boards, res)
        })
    },
    getById (req, res) {
         Board.findOne({_id: req.params.boardId})
             .populate({
                 path: "lists",
                 select: ["title"],
                 model: "List",
                 populate: {
                     path: "cards",
                     select: ["title", "body"],
                     model: "Card"
                 }
             })
             .exec((err, board) => {
                 _handleResponse(err, board, res)
             })
     },
     update (req, res) {
       Board.findByIdAndUpdate(req.params.boardId, {title: req.body.title}, (err, board) => {
         _handleResponse(err, board, res)
       })
     },
     updateListsOrder (req, res) {
        Board.findById(req.body.boardId, (err, board) => {
            if (err) {
                res.status(400).end()
                return
            }

            board.lists = req.body.listIds
            board.save((err, savedBoard) => {
                _handleResponse(err, savedBoard, res)
            })
        })
    }
 }
