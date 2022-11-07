const msgBox = $("#msg-box");

var selected = "one-way";

function setMsgBox(text, color) {

    if(text == ""){
        msgBox.html("");
        return;
    }
    
    msgBox.html(`<span class=\"alert alert-${color} text-small\">${text}</span>`);
}


$("#one-way-tab").on("click", async (e) => {
    selected = "one-way";
});

$("#round-trip-tab").on("click", async (e) => {
    selected = "round-trip";
});

$("#origin1").on("input", async (e) => {
    const val = $("#origin1").val();

    if (val.length < 2) {
        return;
    }

    const response = await fetch(`/api/get-datalist/${val}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    $("#city1").html(
        data.map((city) => {
            return `<option value="${city}">`;
        })
    );
});

$("#destination1").on("input", async (e) => {
    const val = $("#destination1").val();

    if (val.length < 2) {
        return;
    }

    const response = await fetch(`/api/get-datalist/${val}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    // console.log(data);
    $("#city2").html(
        data.map((city) => {
            return `<option value="${city}">`;
        })
    );
});

$("#origin2").on("input", async (e) => {
    const val = $("#origin2").val();

    if (val.length < 2) {
        return;
    }

    const response = await fetch(`/api/get-datalist/${val}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    $("#city3").html(
        data.map((city) => {
            return `<option value="${city}">`;
        })
    );
});

$("#destination2").on("input", async (e) => {
    const val = $("#destination2").val();

    if (val.length < 2) {
        return;
    }

    const response = await fetch(`/api/get-datalist/${val}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    // console.log(data);
    $("#city4").html(
        data.map((city) => {
            return `<option value="${city}">`;
        })
    );
});

async function verifyCode(val1, val2) {
    let vals1 = val1.split("-");
    let vals2 = val2.split("-");

    if (vals1.length != 3 || vals2.length != 3) {
        setMsgBox(
            "Please have an proper format in form {Code} - {Country} - {City}",
            "danger"
        );
        return [false, false];
    }

    let code1 = vals1[0].trim();
    let code2 = vals2[0].trim();

    if (!code1 || code1.length != 3 || !code2 || code2.length != 3) {
        setMsgBox("Code has a length of 3 characters", "danger");
        return [false, false];
    }

    const response = await fetch(`/api/verify-code/${code1}/${code2}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    
    if (!response.ok) {
        setMsgBox("Code is not valid", "danger");
        return [false, false];
    }

    return [code1, code2];
}


async function collectAndValidateSingle() {
    const [originLocationCode, destinationLocationCode] = await verifyCode(
        $("#origin1").val(),
        $("#destination1").val()
    );
    

    if (!originLocationCode || !destinationLocationCode) {
        setMsgBox("Invalid code names", "danger");
        return null;
    }

    const departureDate = $("#departure-s").val();
    const adults = calcTotalGuests();

    if (
        !originLocationCode ||
        !destinationLocationCode ||
        !departureDate ||
        adults <= 0
    )  {
        setMsgBox("Please fill in all the fields", "danger");
        return null;
    }
    const depDate = new Date(departureDate);

    if(depDate == "Invalid Date"){
        setMsgBox("Dates are not valid", "danger");
        return null;
    }

    const sendData = {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
    };
    
    return sendData;
}


async function collectAndValidateRound() {
    const [originLocationCode, destinationLocationCode] = await verifyCode(
        $("#origin2").val(),
        $("#destination2").val()
    );

    if (!originLocationCode || !destinationLocationCode) {
        setMsgBox("Invalid code names", "danger");
        return null;
    }

    const departureDate = $("#departure").val();
    const returnDate = $("#return").val();
    const adults = calcTotalGuests();

    if (
        !originLocationCode ||
        !destinationLocationCode ||
        !departureDate ||
        !returnDate ||
        adults <= 0
    )  {
        setMsgBox("Please fill in all the fields", "danger");
        return null;
    }

    const depDate = new Date(departureDate);
    const retDate = new Date(returnDate);

    if(depDate == "Invalid Date" || retDate == "Invalid Date"){
        setMsgBox("Dates are not valid", "danger");
        return null;
    }

    if(depDate >= retDate){
        setMsgBox("Departure is after return", "danger");
        $("#return")[0].focus();
        return null;
    }

    const sendData = {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
    };

    return sendData;
}


$("#search-btn").on("click", async (e) => {
    var sendData = "";

    if (selected == "one-way") {
        sendData = await collectAndValidateSingle();
    } else {
        sendData = await collectAndValidateRound();
    }

    if (sendData == null) {
        return;
    }

    setMsgBox("Searching....", "success");

    // call fetch to API now
    const response = await fetch("/api/search", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(sendData)
    });


    const html = await response.text();

    if(response.ok){
        $("#placeholder").html(html);
        setMsgBox("", "");
    }else{
        setMsgBox("Server Error", "warning");
    }

});
