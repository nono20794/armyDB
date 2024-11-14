
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