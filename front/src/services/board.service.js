import axios from 'axios'

export default {
  getAll () {
    return axios.get('/api/boards').then(res => res.data)
  },
  findById (boardId) {
    return axios.get('/api/boards/' + boardId).then(res => res.data)
  },
  update(boardId, title) {
    return axios.put( "/api/boards/" + boardId, { title: title } )
      .then(res => res.data)
  },
  updateListsOrder(boardId, listIds) {
    return axios.put("/api/boards/updateListsOrder", { boardId: boardId, listIds: listIds })
      .then(res => res.data)
  }
}
