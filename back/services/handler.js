module.exports = function(err, data, res) {
    if (err) {
        res.status(400).end()
    } else {
        res.send(data)
    }
}
