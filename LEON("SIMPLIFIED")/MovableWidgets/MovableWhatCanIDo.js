// Get element to drag
const draggableElement = document.getElementById("whatcanyoudoWidget");

// Set initial positions
let posX = 0,
  posY = 0,
  previousX = 0,
  previousY = 0,
  availableHeight = window.innerHeight - draggableElement.offsetHeight,
  availableWidth = window.innerWidth - draggableElement.offsetWidth;

// Add event listener
draggableElement.addEventListener("mousedown", initiateDrag);

// Function to start dragging
function initiateDrag(e) {
  e.preventDefault();
  // Get the mouse cursor position at startup:
  previousX = e.clientX;
  previousY = e.clientY;
  document.addEventListener("mouseup", stopDragging);
  // Call a function whenever the cursor moves:
  document.addEventListener("mousemove", dragObject);
}

// Function to move element
function dragObject(e) {
  e.preventDefault();
  // Calculate the new cursor position:
  posX = previousX - e.clientX;
  posY = previousY - e.clientY;
  previousX = e.clientX;
  previousY = e.clientY;
  // Set the element's new position:
  let top = draggableElement.offsetTop - posY;
  let left = draggableElement.offsetLeft - posX;

  if (top > availableHeight) {
    top = availableHeight;
  } else if (top < 0) {
    top = 0;
  }

  if (left > availableWidth) {
    left = availableWidth;
  } else if (left < 0) {
    left = 0;
  }

  draggableElement.style.top = `${top}px`;
  draggableElement.style.left = `${left}px`;
}

// Function to end dragging
function stopDragging() {
  // Stop moving when mouse button is released:
  document.removeEventListener("mouseup", stopDragging);
  document.removeEventListener("mousemove", dragObject);

  // Save the position to the firebase
  const firestoreInstance = firebase.firestore();

  // Check if there is a reference to WHATICANDOWIDGETMOVE
  firestoreInstance
    .collection("WhatCanYouDoWidgetDisplay")
    .doc("WHATICANDOWIDGETMOVE")
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // If it exists, update the position
        firestoreInstance
          .collection("WhatCanYouDoWidgetDisplay")
          .doc("WHATICANDOWIDGETMOVE")
          .update({
            top: draggableElement.style.top,
            left: draggableElement.style.left,
          })
          .then(function () {
            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } else {
        // If it doesn't exist, create one
        firestoreInstance
          .collection("WhatCanYouDoWidgetDisplay")
          .doc("WHATICANDOWIDGETMOVE")
          .set({
            top: draggableElement.style.top,
            left: draggableElement.style.left,
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}
