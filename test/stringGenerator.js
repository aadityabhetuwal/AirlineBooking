process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();
var expect = require('chai').expect;

const apiRouter = require("../routes/api");
const { parseTotalDuration } = require("../services/otherFunctions");

chai.use(chaiHttp);

let tests = [
    {
        title: "Dates Should be parsed Properly",
        body : [
            ["02:03", "PT2H3M"],
            ["00:00", "PT0H0M"],
            ["34:03", "PT34H3M"]
        ]
    }
];


describe("Date parser functions", () => {
    
    tests.forEach(x => {
        it(x.title, () => {
            x.body.forEach(y => {
                expect(y[0]).to.equal(parseTotalDuration(y[1]));
            });
        });
    });

});

