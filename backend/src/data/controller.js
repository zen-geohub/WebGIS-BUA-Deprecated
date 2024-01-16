const pool = require('../../db')
const queries = require('./queries')

const getBoundaries = (req, res) => {
  const gid = req.params.gid
  pool.query(queries.getBoundaries, [gid], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getBoundariesName = (req, res) => {
  pool.query(queries.getBoundariesName, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getCoba = (req, res) => {
  pool.query(queries.getCoba, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getBoundaries,
  getBoundariesName,
  getCoba,
}