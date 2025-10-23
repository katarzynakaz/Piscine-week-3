import { getUserIds } from "./common.mjs";
import { selectDate } from "./form.mjs";
import { getData } from "./storage.mjs";

window.onload = function () {
	const users = getUserIds();
	selectDate();
};

const selectedUser = document.querySelector("#userSelection");
const displayAgenda = document.querySelector("#displayAgendaBox");

selectedUser.addEventListener("change", (e) => {
	const selectedUserId = e.target.value;
	displayAgenda.innerHTML = "";

	if (selectedUserId === "default") {
		displayAgenda.textContent = "Please select a user to view their agenda.";
		return;
	}

	const userData = getData(selectedUserId);
	const currentDate = new Date().toISOString().split("T")[0];

	if (!userData) {
		displayAgenda.textContent = "There are no upcoming revisions for this user";
		return;
	}
	const futureDate = userData.filter((entry) => entry.date >= currentDate);

	renderAgenda(futureDate);
});

export function renderAgenda(data) {
	displayAgenda.innerHTML = "";
	const list = document.createElement("ol");
	list.className = "agendaList";

	const sortedData = [...data].sort(
		(a, b) => new Date(a.date) - new Date(b.date)
	);

	sortedData.forEach((entry) => {
		const item = document.createElement("li");
		item.className = "itemAgendaList";
		item.textContent = `Topic: ${entry.topic}, Date: ${entry.date}`;
		list.appendChild(item);
	});
	displayAgenda.appendChild(list);
}
