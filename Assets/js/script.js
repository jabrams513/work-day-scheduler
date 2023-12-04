// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Standard work day length is 8 hours with the last time entry at 4pm
  let workDayLength = 8;
  // This section of code creates all of the rows for the scheduler
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

    var timeRowEl = $("<div>");
    timeRowEl.addClass("row time-block");
    // Created id for each complete row
    timeRowEl.attr("id", "timeRow-" + (i + workDayLength));

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

    var saveIconEl = $("<i>");
    saveIconEl.addClass("far fa-save");
    // Created id for each save icon
    saveIconEl.attr("id", "saveIcon-" + (i + workDayLength));

    $(".container-fluid").append(timeRowEl);
    timeRowEl.append(hourEl);
    timeRowEl.append(textAreaEl);
    timeRowEl.append(saveBtnEl);
    saveBtnEl.append(saveIconEl);
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // function saveTask(event) {
  //   // event.preventDefault();
  //   console.log(textAreaEl.val())
  //   localStorage.setItem("task", JSON.stringify(textAreaEl));
  // }

  // saveBtnEl.on("click", function (){
  //   console.log(this)
  // });



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // function colorTime() {
  //   setInterval(function () {

  //     var milTime = dayjs().format("HH");
  //     // console.log(milTime)

  //     if (milTime > hourEl.val()) {
  //       textAreaEl.addClass("past")
  //     }
  //     else if (milTime == hourEl.val()) {
  //       textAreaEl.addClass("present")

  //     } else if (milTime < hourEl.val()) {

  //       textAreaEl.addClass("future")
  //     }

  //   }, 1000);
  // }
  // colorTime();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  // This function displays and updates information about the current date and time to the header section
  function updateCurrentTime() {
    setInterval(function () {
      let currentDayEl = dayjs();
      $('#currentDay').text("Today is: " + (currentDayEl.format("dddd" + " " + "MMMM" + " " + "D" + " " + "YYYY" + " @ " + "H:mm:ss")));
    }, 1000)
  }
  updateCurrentTime();
});