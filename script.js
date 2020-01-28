$(document).ready(function() {



let startTime = 9;
let endTime = 17;

if (verifyHours(startTime, endTime)) {
    renderHours(startTime, endTime);
}


});

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
    for (let i = dayStart; i <= dayEnd; i++) {
        let hourNumber = i;
        let AMPM = 'AM';
    
        if (i > 12) {
            hourNumber = i - 12;
            AMPM = 'PM'
        }
    
        let newHour = $(
            `<section id="${i}">
                <div class="hour">${hourNumber} ${AMPM}</div>
                <input type="text">
                <button class="save">save</button>
            </section>`
        );
        $('#hour-list').append(newHour);
    };
}
