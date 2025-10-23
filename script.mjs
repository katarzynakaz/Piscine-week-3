import { getUserIds } from "./common.mjs";
import "./form.mjs";
import { getData } from "./storage.mjs";

window.onload = function () {
	const users = getUserIds();

};

const selectedUser = document.querySelector("#userSelection");
const displayBookmarks = document.querySelector("#displayBookmarks");

selectedUser.addEventListener("change", (e) => {
	const selectedUserId = e.target.value;
	displayBookmarks.innerHTML = "";

	if (selectedUserId === "default") {
		displayBookmarks.textContent = "Please select a user to view their bookmarks.";
		return;
	}

	const userData = getData(selectedUserId);

	if (!userData || userData.length === 0) {
		displayBookmarks.textContent = "There are no bookmarks for this user";
		return;
	}

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
		titleURL.target = "_blank";

		const descriptionText = document.createElement("p");
		descriptionText.textContent = `Description: ${entry.description}`

		const timestampP = document.createElement("p");
		timestampP.textContent = `Created: ${new Date(entry.createdAt).toISOString().split('.')[0].replace('T', ' ')}`;
		

		item.appendChild(titleURL);
		item.appendChild(descriptionText);
		item.appendChild(timestampP);
		
		list.appendChild(item);

	});
	displayBookmarks.appendChild(list);
}
