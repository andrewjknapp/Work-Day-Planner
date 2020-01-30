let startTime = 9;
let endTime = 17;
$(document).ready(function() {

    displayDate();
    if (verifyHours(startTime, endTime)) {
        renderHours(startTime, endTime);
    }

});

let plannerInformation = [];

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
        if (!hasStorage) {
            let hour = {
                time: i,
                activity: "",
                color: "#00FA9A"
            };
            plannerInformation.push(hour);
        }

        if (i >= 12) {
            AMPM = 'PM'
        }
        if (i > 12) {
            hourNumber = i - 12;
        }
        
        //sets current time, user lower to set time manually
        let currentTime = parseInt(new Date().getHours());
        //let currentTime = 11;

        if (i < currentTime) {
            plannerInformation[index].color = '#c8cfcd';
        } else if (i === currentTime) {
            plannerInformation[index].color = '#fa0060';
        } else {
            plannerInformation[index].color = '#00FA9A';
        }
        
        let newHour = $(
            `<div class="container" id="${i}" data-index="${index}">
                <button class="save">Save</button>
                <textarea class="text" style="background: ${plannerInformation[index].color}">${plannerInformation[index].activity}</textarea>
                <div class="hour">${hourNumber} ${AMPM}</div>
            </div>`
        );
        
        $('#hour-list').append(newHour);
        index++;
    };
}

$('#hour-list').on("click", function(event) {
    
    if(event.target.matches('button')) {
        let buttonIndex = parseInt(event.target.parentElement.getAttribute('data-index'));
        let buttonActivity = event.target.nextElementSibling;
        plannerInformation[buttonIndex].activity = buttonActivity.value;
        localStorage.setItem('plannerInformation', JSON.stringify(plannerInformation));
        if (buttonActivity.scrollTop !== 0) {
            buttonActivity.scrollTop = 0;
        }
    }
})
