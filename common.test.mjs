import assert from "node:assert";
import test from "node:test";

function sortDatesAscending(data) {
	return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
}

test("sorts dates ascending correctly", () => {
	const data = [
		{ topic: "B", date: "2025-12-01" },
		{ topic: "A", date: "2025-11-01" },
		{ topic: "C", date: "2025-10-15" },
	];

	const sorted = sortDatesAscending(data);

	assert.deepEqual(
		sorted.map((d) => d.date),
		["2025-10-15", "2025-11-01", "2025-12-01"],
		"Dates should be in ascending order"
	);
});
