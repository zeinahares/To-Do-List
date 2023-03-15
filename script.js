var savedList;
var workdayHours = 9;

var saveButton = $('.saveBtn');
var hourBox = $('.container-lg').children('.row');

$(function () {

  var todaysHour = dayjs().format('HH');

  // set the value of each time in day.js inside html 
  // set the value of #hour-9 to 09
  $('#hour-9').children('.hour').val(dayjs().hour(09).format('HH'));
  // set the value of #hour-10 to 10, etc
  $('#hour-10').children('.hour').val(dayjs().hour(10).format('HH'));
  $('#hour-11').children('.hour').val(dayjs().hour(11).format('HH'));
  $('#hour-12').children('.hour').val(dayjs().hour(12).format('HH'));
  $('#hour-1').children('.hour').val(dayjs().hour(13).format('HH'));
  $('#hour-2').children('.hour').val(dayjs().hour(14).format('HH'));
  $('#hour-3').children('.hour').val(dayjs().hour(15).format('HH'));
  $('#hour-4').children('.hour').val(dayjs().hour(16).format('HH'));
  $('#hour-5').children('.hour').val(dayjs().hour(17).format('HH'));



  // Apply the past, present, or future class to each time block.
  for(var i = 0; i < workdayHours; i++) {
    if (hourBox.eq(i).children('.hour').val() === todaysHour) {
      hourBox.eq(i).addClass('present');
    } else if (hourBox.eq(i).children('.hour').val() < todaysHour) {
      hourBox.eq(i).addClass('past');
    } else if (hourBox.eq(i).children('.hour').val() > todaysHour){
      hourBox.eq(i).addClass('future');
    }
  }

  // print savedList if it is exists

  savedList = JSON.parse(window.localStorage.getItem('To-do list')) || [];
  console.log(savedList.length);

  if(savedList.length != 0) {
    for (var i = 0; i < workdayHours; i++) {

      console.log(savedList[i]);
      hourBox.eq(i).children('textarea').val(savedList[i].todoItem);

    }
  }

  // display the current date in the header of the page
  var todaysDate = dayjs();
  $('#currentDay').text(todaysDate.format('dddd, D MMMM YYYY'));

});


// when save button is clicked, save input to local storage
saveButton.on('click', function() {
  window.localStorage.removeItem('savedList');

  for (var i = 0; i < workdayHours; i++) {
    savedList.pop();
  }

  for (var i = 0; i < workdayHours; i++) {

    var saveElement = {
      time: hourBox.eq(i).children('.hour').val(),
      todoItem: hourBox.eq(i).children('textarea').val().trim(),
    }

    console.log(hourBox.eq(i).children('textarea').val());
    savedList.push(saveElement);

    window.localStorage.setItem('To-do list', JSON.stringify(savedList));
  }

});
