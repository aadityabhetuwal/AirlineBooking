
$("#transfer-form").on("submit", async (e) => {
    e.preventDefault();

    const formData = {
        to_acc_no : $("#acc-no").val(),
        amount : $("#amount").val(),
    };

    console.log(formData);
    
    const response =  await fetch(`/api/transfer/${formData.to_acc_no}/${formData.amount}`, {
        method : "GET",
        mode: "cors",
    });

    const data = await response.json();

    if(response.ok){
        $("#form-message-info").html(
            `<div class="text-success">${data.message}</div>`
        );
    }else{
        $("#form-message-info").html(
            `<div class="text-danger">${data.message}</div>`
        );
    }
});