let startTime = 9;
let endTime = 17;
$(document).ready(function() {


    if (verifyHours(startTime, endTime)) {
        renderHours(startTime, endTime);
    }

});

let plannerInformation = [];

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

        if (i > 12) {
            hourNumber = i - 12;
            AMPM = 'PM'
        }
        
        if (i < parseInt(new Date().getHours())) {
            plannerInformation[index].color = '#c8cfcd';
        } else if (i === parseInt(new Date().getHours())) {
            plannerInformation[index].color = '#fa0060';
        } else {
            plannerInformation[index].color = '#00FA9A';
        }
        
    
        let newHour = $(
            `<section>
                <div class="container" id="${i}" data-index="${index}">
                    <div class="hour">${hourNumber} ${AMPM}</div>
                    <textarea class="text" style="background: ${plannerInformation[index].color}">${plannerInformation[index].activity}</textarea>
                    <button class="save">Save</button>
                </div>
            </section>`
        );
        
        $('#hour-list').append(newHour);
        index++;
    };
}

$('#hour-list').on("click", function(event) {
    
    if(event.target.matches('button')) {
        let buttonIndex = parseInt(event.target.parentElement.getAttribute('data-index'));
        let buttonActivity = event.target.previousElementSibling;
        plannerInformation[buttonIndex].activity = buttonActivity.value;
        localStorage.setItem('plannerInformation', JSON.stringify(plannerInformation));
        if (buttonActivity.scrollTop !== 0) {
            buttonActivity.scrollTop = 0;
        }
    }
})
