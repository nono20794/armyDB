
const currentDate = displayCurrentDate();
const dateWithDots = currentDate.replace(/\//g, ".");
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

// Define shift times as an array of start and end times
const shifts = [
    { shiftNumber: 1, startHour: 8, startMinute: 0, endHour: 8, endMinute: 30 },   // Shift 1: 8:00 - 8:30 AM
    { shiftNumber: 2, startHour: 12, startMinute: 0, endHour: 12, endMinute: 30 }, // Shift 2: 12:00 - 12:30 PM
    { shiftNumber: 3, startHour: 16, startMinute: 0, endHour: 16, endMinute: 30 }  // Shift 3: 16:00 - 16:30
];

// Function to check if the current time is within any shift time and return shift number
function getCurrentShift() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Loop through each shift to check if the current time falls within any shift time
    for (const shift of shifts) {
        const { shiftNumber, startHour, startMinute, endHour, endMinute } = shift;

        if (
            (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
            (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
        ) {
            return shiftNumber;  // Return the shift number if within shift time
        }
    }

    return null;  // Return null if not within any shift time
}
//pillbox data 
let title;
let date;
let commanderName;
let openHour;
let closeHour;
let notes;
let shiftData;


let counters = [0, 0, 0, 0, 0];

function updateCounterFromInput(counterNumber) {
    const inputValue = parseInt(document.getElementById(`counter${counterNumber}`).value, 10);
    if (inputValue < 0) {
        inputValue = 0;  // Reset to 0 if the value is negative
        document.getElementById(`counter${counterNumber}`).value = 0;  // Update the input field
        counters[counterNumber - 1] = 0;
    }
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


function getData(){
    for (let i = 1; i <= 5; i++) {
        updateCounterFromInput(i);
    }
    title = `**${document.getElementById('title').innerText}**`;
    date = `תאריך: ${currentDate}`;
    commanderName = document.getElementById('commander-name').value || "לא צויין";
    openHour = document.getElementById('open-gate').value;
    closeHour = document.getElementById('close-gate').value;
    notes = document.getElementById('notesInput').value || "אין הערות";
    shiftData = `${title}\n${date}\nשם המפקד: ${commanderName}\nפתיחת שער: ${openHour}\nסגירת שער: ${closeHour}\nמספר נכנסים: ${counters[0]}\nמספר יוצאים: ${counters[1]}\nרכבים נכנסים: ${counters[2]}\nרכבים יוצאים: ${counters[3]}\nמסורבים: ${counters[4]}\nהערות: ${notes}`;
}

function copyData()
{
    getData();
    navigator.clipboard.writeText(shiftData).then(() => {
        alert("הועתק");
    }).catch(err => {
        alert("Failed to copy data: " + err);
    });
}

function sendWhatsApp(){
    getData();
    const phoneNumber = "9725000000";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
}

function goHome() {
    window.location.href = 'index.html';
}