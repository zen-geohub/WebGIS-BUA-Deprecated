const {Router} = require('express')
const controller = require('./controller')
const router = Router()

router.get(('/getBoundariesName'), controller.getBoundariesName)
router.get(('/getCoba'), controller.getCoba)
router.get(('/getBoundaries/:gid'), controller.getBoundaries)

module.exports = router