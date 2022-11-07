const guestBtn = document.querySelector("#guests-input-btn"),
    guestOptions = document.querySelector("#guests-input-options"),
    adultsSubsBtn = document.querySelector("#adults-subs-btn"),
    adultsAddBtn = document.querySelector("#adults-add-btn"),
    adultsCountEl = document.querySelector("#guests-count-adults");

let maxNumGuests = 15,
    isGuestInputOpen = false,
    adultsCount = 1,
    childrenCount = 0;
updateValues();

guestBtn.addEventListener("click", function (e) {
    if (isGuestInputOpen) {
        guestBtn.classList.remove("open");
        guestOptions.classList.remove("open");
    } else {
        guestBtn.classList.add("open");
        guestOptions.classList.add("open");
    }
    isGuestInputOpen = isGuestInputOpen ? false : true;
    e.preventDefault();
});


adultsAddBtn.addEventListener("click", function () {
    adultsCount = addValues(adultsCount);
    updateValues();
});
adultsSubsBtn.addEventListener("click", function () {
    adultsCount = substractValues(adultsCount, 1);
    updateValues();
});

function calcTotalGuests() {
    return adultsCount;
}

function addValues(count) {
    return calcTotalGuests() < maxNumGuests ? count + 1 : count;
}

function substractValues(count, min) {
    return count > min ? count - 1 : count;
}

function updateValues() {
    let btnText = `${adultsCount} Travellers`;
    guestBtn.innerHTML = btnText;
    adultsCountEl.innerHTML = adultsCount;
    if (adultsCount == 1) {
        adultsSubsBtn.classList.add("disabled");
    } else {
        adultsSubsBtn.classList.remove("disabled");
    }
    if (calcTotalGuests() == maxNumGuests) {
        adultsAddBtn.classList.add("disabled");
    } else {
        adultsAddBtn.classList.remove("disabled");
    }
}
