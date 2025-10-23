import { addData, getData } from "./storage.mjs";
import { renderAgenda } from "./script.mjs";
import { addDays, addMonths, addYears, format } from "https://esm.sh/date-fns";

const selectedUser = document.querySelector("#userSelection");
const topicName = document.querySelector("#topicName");
const firstDate = document.querySelector("#firstDate");
const topicAdded = document.querySelector("#topicAdded");

export function selectDate() {
  firstDate.value = new Date().toISOString().split("T")[0];
}

const form = document.querySelector("form");
const displayAgenda = document.querySelector("#displayAgendaBox");

const topicsAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

const cleanInput = () => {
  let cleanedTopicValue = topicName.value.trim().toUpperCase();

  if (cleanedTopicValue.length === 0 || cleanedTopicValue.length > 50) {
    alert("Topic must be between 1 and 50 characters.");
    return null;
  }

  for (let char of cleanedTopicValue) {
    if (!topicsAllowedChars.includes(char)) {
      alert("Allowed characters are A-Z, 0-9, and spaces.");
      return null;
    }
  }

  return cleanedTopicValue;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedUserValue = selectedUser.value;
  const topicNameValue = cleanInput();

  const firstDateValue = firstDate.value;
  const [year, month, day] = firstDateValue.split("-").map(Number);
  const inputDate = new Date(year, month - 1, day);

  const revisionDates = [
    addDays(inputDate, 7),
    addMonths(inputDate, 1),
    addMonths(inputDate, 3),
    addMonths(inputDate, 6),
    addYears(inputDate, 1),
  ];

  const newEntries = revisionDates.map((date) => ({
    topic: topicNameValue,
    date: format(date, "yyyy-MM-dd"),
  }));

  if (
    selectedUserValue === "default" ||
    !firstDateValue ||
    !topicNameValue ||
    topicNameValue === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  addData(selectedUserValue, newEntries);
  topicAdded.innerHTML = "Topic added";

  displayAgenda.innerHTML = "";

  const updatedData = getData(selectedUserValue);
  if (updatedData && updatedData.length > 0) {
    const futureDate = updatedData.filter(
      (entry) => new Date(entry.date) >= new Date(firstDateValue)
    );
    futureDate.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderAgenda(futureDate);
  }

  document.querySelector("#topicName").value = "";
  selectDate();
});
