let startTime = 9;
let endTime = 17;
$(document).ready(function() {

    displayDate();
    //Verify hours is here if I ever decide to let the user dictate the range of hours they want displayed.
    //As of now it serves no purpose.
    if (verifyHours(startTime, endTime)) {
        renderHours(startTime, endTime);
    }

});

//This array stores information on each hour block. Gets updated by the renderHours() function as either
//empty objects or whatever is stored in local storage
let plannerInformation = [];


//Formats and displays the current date
function displayDate() {
    let currentDay = new Date();
    dayOfWeek = currentDay.getDay();
    dayOfMonth = currentDay.getDate();
    Month = currentDay.getMonth();

    $('#current-day').text(`${displayWeek(dayOfWeek)}, ${displayMonth(Month)} ${displayDay(dayOfMonth)}`);
}

function displayWeek(day) {
    switch(day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6: 
            return "Saturday";
    }
}
function displayMonth(month) {
    switch(month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3: 
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}
function displayDay(day) {
    switch(day) {
        case 1:
        case 21:
        case 31:
            return `${day}st`;
        case 2:
        case 22:
            return `${day}nd`;
        case 3:
        case 23:
            return `${day}rd`;
        default:
            return `${day}th`;
    }
}

//Verify hours is here if I ever decide to let the user dictate the range of hours they want displayed.
//As of now it serves no purpose.
function verifyHours(dayStart, dayEnd) {
    if (dayStart <= dayEnd) {
        
    } else {
        alert("Invalid times");
        return false;
    }
    if (dayStart > -1 && dayStart < 25 && dayEnd > -1 && dayEnd < 25) {
        return true;
    } else {
        alert("Invalid times"); 
        return false;
    }
    
}


//Creates and displays all hour blocks
function renderHours(dayStart, dayEnd) {
    
    let hasStorage = false;
   
    $('#hour-list').html("");
    
    plannerInformation = [];
   
    if(localStorage.getItem('plannerInformation') !== null) {

        plannerInformation = JSON.parse(localStorage.getItem('plannerInformation'));
        hasStorage = true;
    }

    let index = 0;
   
    for (let i = dayStart; i <= dayEnd; i++) {
        let hourNumber = i;
        let AMPM = 'AM';

        //creates new object for each hour to store that hour's information if no local storage is present.
        if (!hasStorage) {
            let hour = {
                time: i,
                activity: "",
            };
            plannerInformation.push(hour);
        }

        //Aids in formatting the time that is displayed
        if (i >= 12) {
            AMPM = 'PM'
        }
        if (i > 12) {
            hourNumber = i - 12;
        }
        
        //sets current time, user lower to set time manually
        let currentTime = parseInt(new Date().getHours());
        //let currentTime = 11;

        //Determines color of current hour block
        let color = "red";
        if (i < currentTime) {
            color = "#c8cfcd";
        } else if (i === currentTime) {
            color = "#fa0060";
        } else {
            color = "#00FA9A";
        }
        
        //creates hour block and inserts all variables where needed.
        let newHour = $(
            `<div class="container" id="${i}" data-index="${index}">
                <button class="save">Save</button>
                <textarea class="text" style="background: ${color}">${plannerInformation[index].activity}</textarea>
                <div class="hour">${hourNumber} ${AMPM}</div>
            </div>`
        );
        
        //Displays hour block on screen
        $('#hour-list').append(newHour);
        index++;
    };
}

$('#hour-list').on("click", function(event) {
    
    //When save is clicked
    if(event.target.matches('button')) {

        //Gets index of button to correspond to index of array where data will be stored
        let buttonIndex = parseInt(event.target.parentElement.getAttribute('data-index'));
        //targets textarea associated with save button clicked
        let buttonActivity = event.target.nextElementSibling;

        //Saves text in the array of objects at the same index as the button clicked
        plannerInformation[buttonIndex].activity = buttonActivity.value;

        //Stores array with new information into local storage
        localStorage.setItem('plannerInformation', JSON.stringify(plannerInformation));

        //If textarea spans multiple lines this scrolls back to top
        if (buttonActivity.scrollTop !== 0) {
            buttonActivity.scrollTop = 0;
        }
    }
})
