const db = require("../config/dbConnect");
const { v4: uuidv4 } = require("uuid");


const getDataList = async (city_name) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select code, country, city_name from cities where 
    city_name like '%${city_name}%' or country like '%${city_name}%'`,
            (err, result) => {
                if (err) {
                    console.error(err);
                    reject("Server Error");
                    return;
                }

                if (!result) {
                    reject("User Not Found");
                    return;
                }

                data = result.map((x) => {
                    return `${x.code} - ${x.country} - ${x.city_name}`;
                });

                data = data.sort();

                resolve(data);
            }
        );
    });
};

const verifyCodes = async (code1, code2) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select code from cities where code = ? or code = ?`, [code1, code2],
            (err, result) => {
                if (err) {
                    console.error(err);
                    reject("Server Error");
                    return;
                }

                if (!result || result.length != 2) {
                    reject("User Not Found");
                    return;
                }

                resolve(true);
            }
        );
    });
};


module.exports = { getDataList, verifyCodes };
