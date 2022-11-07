
$("#passwd-toogler").on("click", function (e) {
    
    console.log($("#passwd-toogler")[0].checked);

    if( $("#passwd-toogler")[0].checked ){
        $("#password")[0].type = "text";
    }else{
        $("#password")[0].type = "password";
    }
});

$("#login-form").on("submit", async (e) => {
    e.preventDefault();

    const formData = {
        acc_no : $("#acc-no").val(),
        password : $("#password").val(),
    };

    const response =  await fetch('/api/login-user', {
        method : "POST",
        mode: "cors",
        body : JSON.stringify(formData),
        headers : {
            "Content-Type" : "application/json",
        }
    });

    const data = await response.json();

    if(response.ok){
        console.log(1111);
        window.location.href = '/csrf/transfer';
    }else{
        $("#form-message-info").html(
            `<div class="text-danger">${data.message}</div>`
        );
    }
});