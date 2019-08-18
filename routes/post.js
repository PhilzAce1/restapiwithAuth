const router = require('express').Router()
const verify = require('./validatetoken')

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'random data to test auth '
        }
    });
});


module.exports = router;