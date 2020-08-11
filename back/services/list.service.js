const List = require('../models/list.model')
const Board = require('../models/board.model')
const _handleResponse = require('./handler')

module.exports = {
  create (req, res) {
      Board.findById(req.body.boardId, (err, board) => {
          if (err) {
              return _handleResponse(err, null, res)
          }

          if (!board) {
              return _handleResponse("Error", null, res)
          }

          List.create({title: req.body.title}, (err, card) => {
              board.lists.push(card._id)
              board.save(() => {
                  _handleResponse(err, card, res)
              })
          })
      })
  }
}
