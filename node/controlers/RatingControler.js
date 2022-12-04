const { Rating } = require("../models")
class RatingControler {
    static async UpdateRating(req, res) {
        const data = req.body.obj
        console.log(data);
        const digit = await Rating.update({
            digit: data.digit,
            comment: data.comment
        }, {
            where: { id: data.id },
        });
        res.send("updated")
    }

}

module.exports = { RatingControler }