var express = require("express");
const { getDataList, verifyCodes } = require("../services/dbFunctions");
var router = express.Router();
const { prepareData } = require("../services/otherFunctions");
const fs = require("fs");

const amadeus = require("../config/Amadeus");
/* GET home page. */

router.get("/get-datalist/:val", async function (req, res, next) {
    const val = req.params.val;

    if (!val || val.length < 2) {
        return res.sendStatus(400);
    }

    try {
        const data = await getDataList(val);

        return res.status(200).json(data);
    } catch {
        return res.sendStatus(500);
    }
});

router.get("/verify-code/:code1/:code2", async function (req, res, next) {
    const { code1, code2 } = req.params;

    if (!code1 || code1.length != 3 || !code2 || code2.length != 3) {
        return res.sendStatus(400);
    }

    try {
        const data = await verifyCodes(code1, code2);

        return res.status(200).json({
            message: "true",
        });
    } catch {
        return res.status(500).json({
            messgage: "Invalid codes",
        });
    }
});

router.post("/search", async function (req, res, next) {
    const {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
    } = req.body;

    if (
        !originLocationCode ||
        !destinationLocationCode ||
        !departureDate ||
        adults <= 0
    ) {
        return res.status(400).json({
            message: "Bad Request",
        });
    }

    try{
        const data = await verifyCodes(originLocationCode, destinationLocationCode);

    }catch(err){
        return res.status(400).json({
            messgage: "Invalid codes",
        });
    }

    let sentData = {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
    };

    let depDate = new Date(departureDate);

    if(depDate == "Invalid Date"){
        return res.status(400).json({
            message: "Dates are not valid",
        });
    }

    if (returnDate && returnDate != "") {
        let retDate = new Date(returnDate);
    
        if(retDate == "Invalid Date"){
            return res.status(400).json({
                message: "Dates are not valid",
            });
        }

        if(depDate >= retDate){
            return res.status(400).json({
                message: "Departure cannot be after return",
            });
        }

        sentData = {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            returnDate,
            adults,
        };
    }

    console.log(sentData);

    amadeus.shopping.flightOffersSearch
        .get(sentData)
        // .then(function (response) {
        //     return amadeus.shopping.flightOffers.pricing.post(
        //         JSON.stringify({
        //             data: {
        //                 type: "flight-offers-pricing",
        //                 flightOffers: [response.data.slice(0, 20)],
        //             },
        //         })
        //     );
        // })
        .then((response) => {
            let impData = prepareData(response.data);

            fs.open("public/result.json", "w", (err, fd) => {
                fs.writeFileSync(fd, JSON.stringify(response.data));

                res.render("result", { impData });
            });

        })
        .catch(function (err) {
            console.error(err);
            return res.status(500).json({
                message: err,
            });
        });
});

module.exports = router;
