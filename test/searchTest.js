process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

const apiRouter = require("../routes/api");

chai.use(chaiHttp);

let tests = [
    {
        title: "Sending null values and empty strings",
        body: [
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "11/22/2022",
                returnDate: "11/28/2022",
                adults: 1,
            },
            {
                originLocationCode: null,
                destinationLocationCode: "DEL",
                departureDate: "11/22/2022",
                returnDate: "11/22/2022",
                adults: 1,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: null,
                departureDate: "11/22/2022",
                returnDate: "11/10/2022",
                adults: 1,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: null,
                returnDate: "11/10/2022",
                adults: 1,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "10/10/2022",
                returnDate: null,
                adults: 1,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "10/10/2022",
                returnDate: "10/10/2022",
                adults: 0,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "10/10/2022",
                returnDate: "10/10/2022",
                adults: -1,
            },
        ],
    },
    {
        title: "Return should be greater than departure",
        body: [
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "11/22/2022",
                returnDate: "11/22/2022",
                adults: 1,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "11/22/2022",
                returnDate: "11/10/2022",
                adults: 1,
            },
        ],
    },
    {
        title: "Dates should be valid",
        body: [
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "11/22/20dfddf22",
                returnDate: "11/22/2022",
                adults: 1,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DEL",
                departureDate: "11/22/20dfddf22",
                returnDate: "11/22/fdfd2022",
                adults: 1,
            },
        ],
    },
    {
        title: "Station codes should be valid",
        body: [
            {
                originLocationCode: "BER",
                destinationLocationCode: "DEL",
                departureDate: "11/22/20dfddf22",
                returnDate: "11/22/fdfd2022",
                adults: 1,
            },
            {
                originLocationCode: "BLR",
                destinationLocationCode: "DXL",
                departureDate: "11/22/2022",
                returnDate: "11/10/202fddd2",
                adults: 1,
            },
        ],
    },
];

describe("GET /search", () => {
    for (x of tests) {
        it(x.title, (done) => {
            for (reqData of x.body) {
                chai.request(server).post("/api/search").send(reqData)
                .end((err, res) => {
                    res.should.have.status(400);
                });
            }
            done();
        });
    }
});
