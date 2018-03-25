$(document).ready(function(){
  

    // Initialize Firebase
var config = {
  apiKey: "AIzaSyCK9ZTL6o8WvRlfu82qXDUtu6bHu9kXvvE",
    authDomain: "testproject-e520a.firebaseapp.com",
    databaseURL: "https://testproject-e520a.firebaseio.com",
    projectId: "testproject-e520a",
    storageBucket: "testproject-e520a.appspot.com",
    messagingSenderId: "22364376042"
};
firebase.initializeApp(config);
var database = firebase.database();
$('#addTrainBtn').on("click", function() {
  // Input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  // local temp obj holding train data
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // upload to DB
  database.ref().push(newTrain);
  
  // clear boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  // stops from moving to new page
  return false;
});
//  Create a firebase event listner for adding trains to db and row in HTML when entry added
database.ref().on("child_added", function(childSnapshot) {
  
  // Store childSnapshot values in a var
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  // Next train set to ensure it comes after current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  
  var currentTime = moment().format("HH:mm");
  
  // Fisrt train diff from current time into var
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  
  // Remainder time left store in var
  var timeRemainder = timeDiff % frequency;
  
  // minutes to train - store as var
  var minToTrain = frequency - timeRemainder;
  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});

  
  });