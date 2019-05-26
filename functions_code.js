var lenSelectedColumns = 0
var columnsHistory = []
var fileName = "columnsHistory.csv"
var shouldSendPost = true
sendStart = function () {
	var http = new XMLHttpRequest();
	http.open("POST", "http://127.0.0.1:5000/start", true);
	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	http.send()
}
sendSelectedColumn = function (column) {
	if (shouldSendPost) {
		lenSelectedColumns += 1
		columnsHistory.push(column)
		var http = new XMLHttpRequest();
		http.open("POST", "http://127.0.0.1:5000/selectcolumn?column=" + column, false);
		http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		http.send()
	} else {
		shouldSendPost = true
	}
}
updateColumnsFromFile = function () {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", fileName, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var text = rawFile.responseText
				columnsHistory = JSON.parse(text);
				if (lenSelectedColumns !== columnsHistory.length) {
					lenSelectedColumns = columnsHistory.length;
					shouldSendPost = false
					document.getElementById("color" + 1 + columnsHistory[columnsHistory.length - 1]).click()
				}
			}
		}
	}
	rawFile.send(null);
	update_player_identification(lenSelectedColumns);
}
create_matrix = function () {	
	sendStart();	
	window.clearInterval();
	lenSelectedColumns = 0;
	columnsHistory = []
	window.setInterval(updateColumnsFromFile, 1500);
	matrix_rows = parseInt(document.getElementById("matrix_rows").value) + 1;
	matrix_columns = parseInt(document.getElementById("matrix_columns").value) + 1;
	t = document.querySelector("#principal");
	trow = document.createElement("tr");
	td = document.createElement("td");
	var number;
	var i;
	var j;
	while (t.firstChild) {
		t.removeChild(t.firstChild);
	}
	for (i = 1; i < matrix_rows; i++) {
		trow = document.createElement("tr");
		for (j = 1; j < matrix_columns; j++) {
			td = document.createElement("td");
			number = "color" + ((i * 10) + j);
			td.setAttribute("id", number);
			trow.appendChild(td);
		}
		t.appendChild(trow)
	}
	
	(function (doc, win, onclick, gid, classname, content, showMessage) {
		var
			a, b, c, colorLabel, cid, players, current, finished, newgameLabel, wonLabel, laststart = 1,
			cellAt = function (i, j) {
				return doc[gid](cid + i + j);
			},
			isCurrentColor = function (i, j) {
				return cellAt(i, j)[classname] === players[current];
			},
			start = function () {
				current = laststart = (laststart + 1) % 2;
				finished = 0;
				colorLabel[content] = colorLabel[classname] = players[current = (current + 1) % 2];
				for (a = 1; a < matrix_rows; a++)
					for (b = 1; b < matrix_columns; b++)
						cellAt(a, b)[classname] = '';						
			},
			makeMove = function (i, j, s) {
				s > 0 && (cellAt(s, j)[classname] = '');
				cellAt(s + 1, j)[classname] = players[current];
				s === i - 1 ? function (i, j) {
					return function (i, j) {
						for (a = j - 1; 0 < a && isCurrentColor(i, a); a--) {
						}
						for (b = j + 1; matrix_columns > b && isCurrentColor(i, b); b++) {
						}
						return 4 < b - a;
					}(i, j) || function (i, j) {
						for (c = i + 1; matrix_rows > c && isCurrentColor(c, j); c++) {
						}
						return 3 < c - i;
					}(i, j) || function (i, j) {
						for (a = i - 1, b = j - 1; 0 < a && !(1 > b) && isCurrentColor(a, b); a--)
							b--;
						for (c = i + 1, b = j + 1; matrix_rows > c && !(matrix_rows <= b) && isCurrentColor(c, b); c++)
							b++;
						return 4 < c - a
					}(i, j) || function (i, j) {
						for (a = i - 1, b = j + 1; 0 < a && !(matrix_rows <= b) && isCurrentColor(a, b); a--)
							b++;
						for (c = i + 1, b = j - 1; matrix_rows > c && !(1 > b) && isCurrentColor(c, b); c++)
							b--;
						return 4 < c - a;
					}(i, j);
				}(i, j)
					? finished = 1 && win[showMessage](doc[gid](wonLabel)[content].replace("%s", players[current].toLowerCase())) && start()
					: colorLabel[content] = colorLabel[classname] = players[current = (current + 1) % 2]
					: setTimeout(function () {
						makeMove(i, j, s + 1)
					}, 70);//Valor del tiempo de los movimientos "makeMove" de la animación.
			};
		return function (n, w, c, h, p1, p2) {
			cid = c;
			newgameLabel = n;
			wonLabel = w;
			colorLabel = doc[gid](c);
			players = [doc[gid](p1)[content], doc[gid](p2)[content]];
			for (a = 1; a < matrix_rows; a++)
				for (b = 1; b < matrix_columns; b++)
					cellAt(a, b)[onclick] = function (b, a) {
						return function () {
							if (!finished)
								for (a = matrix_rows - 1; a > 0; a--)
									if (!cellAt(a, b)[classname]) {
										makeMove(a, b, 0);
										break;
									}
							sendSelectedColumn(b);
						};
					}(b);
			;
			doc[gid](h)[onclick] = function () {
				win[showMessage](doc[gid](newgameLabel)[content]) && start()
			};
			start();
		};
	})(document, window, "onclick", "getElementById", "className", "innerHTML", "confirm")("newgame", "won", "color", "restart", "p1", "p2");

	//update_player_identification();
}

update_player_identification = function (lenSelectedColumns) {
	var player_color = document.getElementById("color").className;
	
	if (player_color == "Red") {
		document.getElementById("player_identification").innerHTML = '<span style="background-color: #FF0000">Turn of Quantum Intelligence.</span>';
		document.getElementById("number_of_moves").innerHTML = "Number of moves = " + lenSelectedColumns;
	}
	else if (player_color == "Yellow") {
		document.getElementById("player_identification").innerHTML = '<span style="background-color: #FFFF00">Classical human, your turn!</span>';
		document.getElementById("number_of_moves").innerHTML = "Number of moves = " + lenSelectedColumns;
	}
	else {
		document.getElementById("player_identification").innerHTML = "";
		document.getElementById("number_of_moves").innerHTML = "";
		document.getElementById("number_of_moves").innerHTML = "Number of moves = 0";
	}
}