const Spot = require('../models/Spot');

module.exports = {
    async show(req, res){
        const { user_id } = req.query;

        console.log(user_id);

        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}