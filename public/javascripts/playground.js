
$("#passwd-toogler").on("click", function (e) {
    
    console.log($("#passwd-toogler")[0].checked);

    if( $("#passwd-toogler")[0].checked ){
        $("#password")[0].type = "text";
    }else{
        $("#password")[0].type = "password";
    }
});

$("#login-btn").on("click", async (e) => {
    e.preventDefault();

    const formData = {
        username : $("#username").val(),
        password : $("#password").val(),
    };

    let url = '/api/verify-credentials';

    if($("#secure-toogler")[0].checked){
        url += `?secure=yes`
    }

    const response =  await fetch(url, {
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
            `<div class="text-success">Correct Credentials</div>`
        );
    }else{
        if(response.status == 500){
            $("#form-message-info").html(
                `<div class="text-danger">Internal server error</div>`
            );
        }else if(response.status == 400){
            $("#form-message-info").html(
                `<div class="text-danger">${data.message}</div>`
            );
        }
    }
});