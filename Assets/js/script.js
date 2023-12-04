// Function call to jquery to ensure the browser has finished rendering all the elements in the HTML
$(function () {
  // Standard work day length is 8 hours with the last time entry at 4pm
  let workDayLength = 8;
  // This section of code creates all of the rows for the scheduler and color codes them
  for (let i = 1; i <= workDayLength; i++) {
    var colorKey = "";
    var rowHour = i + workDayLength;
    let currentHour = dayjs().hour();

    if (rowHour < currentHour){
      colorKey = "past"
    }
    else if (rowHour === currentHour){
      colorKey = "present"
    }
    else {
      colorKey = "future"
    }

    // Create time row elements
    var timeRowEl = $("<div>");
    timeRowEl.addClass("row time-block");
    // Created id for each complete row
    timeRowEl.attr("id", "timeRow-" + (i + workDayLength));

    // Create hour column
    var hourEl = $("<div>");
    hourEl.addClass("hour col-1");
    hourEl.text((i + workDayLength) + " o'clock");
    // Created id for each hour
    hourEl.attr("id", "hour-" + (i + workDayLength));

    // Add colorkey and id to the text area
    var textAreaEl = $("<textarea>");
    textAreaEl.addClass("textarea col-9 description " + colorKey);
    // Created id for each text area
    textAreaEl.attr("id", "textarea-" + (i + workDayLength));
    textAreaEl.val(localStorage.getItem(i + workDayLength));

    // Create save buttons
    var saveBtnEl = $("<button>");
    saveBtnEl.addClass("saveBtn col-1");
    // Created id for each save button
    saveBtnEl.attr("id", "saveBtn-" + (i + workDayLength));

    // SaveBtn event listener and store in local storage
    saveBtnEl.on("click", function () {
      var hourKey = $(this).attr("id").split("-").pop();
      var activity = $(this).siblings(".description").val();
      localStorage.setItem(hourKey, activity)
    });

    // Create save icons
    var saveIconEl = $("<i>");
    saveIconEl.addClass("far fa-save");
    // Created id for each save icon
    saveIconEl.attr("id", "saveIcon-" + (i + workDayLength));

    // Append elements to one another so they appear in proper order
    $(".container-fluid").append(timeRowEl);
    timeRowEl.append(hourEl);
    timeRowEl.append(textAreaEl);
    timeRowEl.append(saveBtnEl);
    saveBtnEl.append(saveIconEl);
  }

  // This function displays and updates information about the current date and time to the header section
  function updateCurrentTime() {
    setInterval(function () {
      let currentDayEl = dayjs();
      $('#currentDay').text("Today is: " + (currentDayEl.format("dddd" + " " + "MMMM" + " " + "D" + " " + "YYYY" + " @ " + "H:mm:ss")));
    }, 1000)
  }
  updateCurrentTime();
});