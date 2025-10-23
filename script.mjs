import { getUserIds } from "./common.mjs";
// import { selectDate } from "./form.mjs";
import { getData } from "./storage.mjs";

window.onload = function () {
	const users = getUserIds();
	// selectDate();
};

const selectedUser = document.querySelector("#userSelection");
const displayBookmarks = document.querySelector("#displayBookmarks");

selectedUser.addEventListener("change", (e) => {
	const selectedUserId = e.target.value;
	displayABookmarks.innerHTML = "";

	if (selectedUserId === "default") {
		displayAgenda.textContent = "Please select a user to view their bookmarks.";
		return;
	}

	const userData = getData(selectedUserId);
	// const currentDate = new Date().toISOString().split("T")[0];

	if (!userData) {
		displayAgenda.textContent = "There are no upcoming bookmarks for this user";
		return;
	}
	// const futureDate = userData.filter((entry) => entry.date >= currentDate);

	renderBookmarks(userData);
});

export function renderBookmarks(data) {
	displayBookmarks.innerHTML = "";
	const list = document.createElement("ol");
	list.className = "bookmarkList";

	const sortedData = [...data].sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	sortedData.forEach((entry) => {
		const item = document.createElement("li");
		item.className = "itemBookmark";

		const titleURL = document.createElement("a");
		titleURL.href = entry.url;
		titleURL.textContent = entry.title;

		const descriptionText = document.createElement("p");
		const createdAt = new Date(entry.createdAt);

		item.appendChild(titleURL);
		item.appendChild(descriptionText);
		item.appendChild(timestampText);
		
		list.appendChild(item);

	});
	displayBookmarks.appendChild(list);
}
