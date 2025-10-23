import { addData, getData } from "./storage.mjs";
import { renderBookmarks } from "./script.mjs";

const selectedUser = document.querySelector("#userSelection");
const urlInput = document.querySelector("#newURL");
const titleInput = document.querySelector("#newURLTitle");
const descriptionInput = document.querySelector("#newURLDesc");
const successMessageSpan = document.querySelector("#newURLAdded");


const form = document.querySelector("form");
const displayBookmarks = document.querySelector("#displayBookmarks");

const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "

// const cleanInput = () => {
//   let cleanedTitleValue = titleInput.value.trim().toUpperCase();

//   if (cleanedTitleValue.length === 0 || cleanedTitleValue.length > 50) {
//     alert("Bookmark title must be between 1 and 50 characters and not empty.");
//     return null;
//   }

//   for (let char of cleanedTitleValue) {
//     if (!allowedChars.includes(char)) {
//       alert("Allowed characters are A-Z, 0-9, and spaces.");
//       return null;
//     }
//   }

//   return cleanedTitleValue;
// };

const cleanInput = (inputValue, stringToShowWhatField) => {
  let cleanedValue = inputValue.trim().toUpperCase();

  if (cleanedValue.length === 0 || cleanedValue.length > 50) {
    alert(`${stringToShowWhatField} must be between 1 and 50 characters and not empty.`);
    return null;
  }

  for (let char of cleanedValue) {
    if (!allowedChars.includes(char)) {
      alert(`Allowed characters for ${stringToShowWhatField} are A-Z, 0-9, and spaces.`);
      return null;
    }
  }

  return cleanedValue;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedUserValue = selectedUser.value;
  const titleValue = cleanInput(titleInput.value, "Bookmark Title");
  const descriptionValue = cleanInput(descriptionInput.value, "description");
  const urlValue = urlInput.value.trim();

  // const newEntries = revisionDates.map((date) => ({
  //   topic: topicNameValue,
  //   date: format(date, "yyyy-MM-dd"),
  // }));

  const newEntries = [{
    url: urlValue,
    title: titleValue,
    description: descriptionValue,
    createdAt: new Date().toISOString(), 
  }];

  if (
    selectedUserValue === "default" ||
    !urlValue ||
    !descriptionValue ||
    !titleValue
  ) {
    alert("Please fill all the fields");
    return;
  }
  

  addData(selectedUserValue, newEntries);
  successMessageSpan.innerHTML = "Bookmark added";

  urlInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  displayBookmarks.innerHTML = "";

  const updatedData = getData(selectedUserValue);
  if (updatedData && updatedData.length > 0) {
    
    renderBookmarks(updatedData);
  }


});
