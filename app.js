
function navigateTo(page) {
    window.location.href = page;
}

const currentDate = displayCurrentDate();
//display date and create an entry in the db for this day 
function displayCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-IL', options);
    document.getElementById('date').innerHTML = `תאריך:&nbsp;&nbsp;&nbsp;${formattedDate}`;
    console.log(formattedDate)
    const stringWithDots = formattedDate.replace(/\//g, ".");
    console.log(stringWithDots);
    firestore.collection("412A").doc(stringWithDots).set({});
    return formattedDate;
}

let counters = [0, 0, 0, 0, 0];

function updateCounterFromInput(counterNumber) {
    const inputValue = parseInt(document.getElementById(`counter${counterNumber}`).value, 10);
    counters[counterNumber - 1] = isNaN(inputValue) ? 0 : inputValue;
}

function increment(counterNumber) {
    counters[counterNumber - 1] += 1;
    document.getElementById(`counter${counterNumber}`).value = counters[counterNumber - 1];
}

function decrement(counterNumber) {
    if (counters[counterNumber - 1] > 0) {
        counters[counterNumber - 1] -= 1;
        document.getElementById(`counter${counterNumber}`).value = counters[counterNumber - 1];
    }

}