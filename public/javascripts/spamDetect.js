$("#spam-text").val("");

$("#spam-form").on("submit", async (e) => {
    e.preventDefault();

    const formData = {
        text : $("#spam-text").val(),
    };

    console.log(formData);
    
    $("#form-message-info").html(
        `<div>Predicting Output.....</div>`
    );

    const response =  await fetch(`/api/spam/predict`, {
        method : "POST",
        mode: "cors",
        body : JSON.stringify(formData),
        headers : {
            "Content-Type" : "application/json",
        }
    });

    const data = await response.json();

    if(response.ok){
        $("#form-message-info").html(
        `<div class="text-success text-center">Given text is ${data.prediction[0]}</div>`
        );
    }else{
        $("#form-message-info").html(
            `<div class="text-danger">${data.message}</div>`
        );
    }
});