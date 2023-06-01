function leonSETREMINDER(transcript) {
  console.log(transcript);
  var value = transcript;
  var words = value.split(" ");
  var index = words.indexOf("to");
  var reminder = words.slice(index + 1).join(" ");
  console.log(reminder);
  firebase.database().ref("REMINDERS").push(reminder);
}
