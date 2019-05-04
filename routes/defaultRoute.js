const express = require('express');
const route = express.Router();
const ClubList = require('../src/models/collageClub');
const { User } = require('../src/models/user');
const ClubAchievement = require('../src/models/clubAchievement');
const ClubDetails = require('../src/models/clubDetails');
const ClubMedia = require('../src/models/clubMedia');

route.get('/', async (req, res) => {
    try {
        let club_data = await ClubList.aggregate([{
            "$lookup": {
                from: "clubdetails",
                localField: "_id",
                foreignField: "club_id",
                as: "clubDetails",
            }
        }, {
            "$sort": {
                "created_at": -1
            }
        }
        ]);
        // res.json(club_data);
        if (club_data.length !== 0) {
            res.render('default/index', { club_data });
        } else {
            res.render('default/index', { club_data:undefined });
        }
    } catch (error) {

    }
});
route.get('/club/:club_name', async (req, res) => {
    try {
        let club_name = req.params.club_name;
        let club_name_str = club_name.split('_').join(' ');
        let club_id = await ClubList.find({ club_name: club_name_str});
        let club_data =await ClubDetails.find({club_id:club_id[0]._id});
        let club_media_data =await ClubMedia.find({club_id:club_id[0]._id});
        // res.json(
        //     {
        //         club_data,
        //         club_id,
        // club_media_data
        //     }
        // );
        if (club_data.length !== 0) {
            res.render('default/about', { club_data, club_id, club_media_data });
        } else {
            res.send(404);
        }
        // res.render('default/about');
    } catch (error) {
        console.error(error);
    }
});
route.get('/contact', async (req, res) => {
    res.render('default/contact');
});
module.exports = route;