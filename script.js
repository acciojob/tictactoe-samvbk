//your JS code here. If required.
const setup = document.getElementById("setup");
const game =  document.getElementById("game");
const status = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const btn = document.getElementById("submit");

let p1 = "p1";
let p2 = "p2";
let cp = "X";
let bS = ["","","","","","","","",""];
let gA = true;

const wC = [[0,1,2], [3, 4, 5], [6, 7, 8],[0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6]];

btn.addEventListener('click',() =>{
	const p1in = document.getElementById("player-1").value.trim();
	const p2in = document.getElementById("player-2").value.trim();

	if (p1in !== "") {
		p1 = p1in;
	}
	if (p2in !== "") {
		p2 = p2in;
	}

	setup.classList.add("hidden");
	game.classList.remove("hidden");

	updateTurnStatus();
});

function updateTurnStatus() {
	if (cp === "X") {
		status.textContent = `${p1}, you're up`;
	}
	else{
		status.textContent = `${p2}, you're up`;
	}
}

cells.forEach(cell =>{
	cell.addEventListener('click',(e) =>{
		const index = e.target.getAttribute('data-index');

		if (bS !== "" || !gA) {
			return;
		}

		bS[index] = cp;
		e.target.textContent = cp;

		checkResult();
	});
});


function checkResult() {
	let rW = false;

	for (let cond of wC) {
		let a = bS[cond[0]];
		let b = bS[cond[1]];
		let c = bS[cond[2]];

		if (a===""||b===""||c==="") {
			continue;
		}

		if (a===b&&b===c) {
			rW = true;
			break;
		}
	}

	if (rW) {
		const wN = cp ==="X" ? p1:p2;
		status.textContent = `${wN} congratulations you won!`
		gA = false;
		return;
	}
	if (!bS.includes("")) {
		status.textContent = "draw";
		gA=false;
		return;
	}

	cp = cp === "X" ? "O":"X";
	updateTurnStatus();
}


