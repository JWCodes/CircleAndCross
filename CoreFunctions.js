/////////////////////////////////////////////////////////TYPES DECLARATIONS///////////////////////////////////////////////////////////////////////////////////
FieldValue = { Empty : 0, Circle : 1, Cross : 2 }
GameResult = { NoVictory : 0, CirclesWon : 1, CrossesWon : 2, Draw : 3 }
Sign = { Circle : 1, Cross : 2 }

/////////////////////////////////////////////////////////GLOBAL DECLARATIONS//////////////////////////////////////////////////////////////////////////////////
var activePlayer = Sign.Circle;
var playArea = [ [0,0,0], [0,0,0], [0,0,0] ];
var VictoryLines  =     [ [ [ 0,0 ], [ 0,1 ], [ 0,2 ] ], 
						[ [ 1,0 ], [ 1,1 ], [ 1,2 ] ],
						[ [ 2,0 ], [ 2,1 ], [ 2,2 ] ],
						[ [ 0,0 ], [ 1,0 ], [ 2,0 ] ], 
						[ [ 0,1 ], [ 1,1 ], [ 2,1 ] ], 
						[ [ 0,2 ], [ 1,2 ], [ 2,2 ] ],
						[ [ 2,0 ], [ 1,1 ], [ 0,2 ] ],						
						[ [ 0,0 ], [ 1,1 ], [ 2,2 ] ] ];

/////////////////////////////////////////////////////////FUNCTIONS////////////////////////////////////////////////////////////////////////////////////////////
function RestartGame()
{
	playArea = [ [0,0,0], [0,0,0], [0,0,0] ];
	
	document.getElementById("00").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("01").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("02").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("10").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("11").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("12").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("20").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("21").innerHTML = "<DIV class=\"EmptyField\">";
	document.getElementById("22").innerHTML = "<DIV class=\"EmptyField\">";
}

function MakeMove(field)
{
	var x = field.id[0];
	var y = field.id[1];
	
	if (playArea[x][y] != FieldValue.Empty)
	{
		alert('This move is not allowed!');
		return;
	}
		
	playArea[x][y] = activePlayer;
	
	if (activePlayer == Sign.Circle)
		field.innerHTML = "<DIV class=\"CircleField\">";
	else
		field.innerHTML = "<table><tr><td class=\"CrossTD\"><DIV class=\"CrossBottomRight\" /></td><td class=\"CrossTD\"><DIV class=\"CrossBottomLeft\" /></td></tr><tr><td class=\"CrossTD\"><DIV class=\"CrossTopRight\" /></td><td class=\"CrossTD\"><DIV class=\"CrossTopLeft\" /></td></tr></table>";
	
	var gameResult = CheckForVictory();
	
	switch (gameResult)
	{
		case GameResult.CirclesWon:
				alert("Circles won!");
				RestartGame();
			return;
		
		case GameResult.CrossesWon:
				alert("Crosses won!");
				RestartGame();
			return;
		
		case GameResult.Draw:
				alert("It's a draw! Better luck next time.");
				RestartGame();
			return;
		
		default:
			break;
	}
	
	if (activePlayer == Sign.Circle)
		activePlayer = Sign.Cross;
	else
		activePlayer = Sign.Circle;
}

function Load()
{
	var field00 = document.getElementById("00");
	field00.addEventListener("click", function () { MakeMove(field00); }, false);
	
	var field01 = document.getElementById("01");
	field01.addEventListener("click", function () { MakeMove(field01); }, false);
	
	var field02 = document.getElementById("02");
	field02.addEventListener("click", function () { MakeMove(field02); }, false);
	
	var field10 = document.getElementById("10");
	field10.addEventListener("click", function () { MakeMove(field10); }, false);
	
	var field11 = document.getElementById("11");
	field11.addEventListener("click", function () { MakeMove(field11); }, false);
	
	var field12 = document.getElementById("12");
	field12.addEventListener("click", function () { MakeMove(field12); }, false);
	
	var field20 = document.getElementById("20");
	field20.addEventListener("click", function () { MakeMove(field20); }, false);
	
	var field21 = document.getElementById("21");
	field21.addEventListener("click", function () { MakeMove(field21); }, false);
	
	var field22 = document.getElementById("22");
	field22.addEventListener("click", function () { MakeMove(field22); }, false);
}
		
function CheckForVictory()
{		
	var Field, CorrectField = FieldValue.Empty;
	var CorrectFieldCount = 0;

	for (i = 0; i < 8; ++i)
	{		
		for (j = 0; j < 3; ++j)
		{
			Field = playArea[VictoryLines[i][j][0]][VictoryLines[i][j][1]];
			
			if (Field != CorrectField)
			{
				CorrectField = Field;
				CorrectFieldCount = 1;
			}
			else
				++CorrectFieldCount;
		}
   
		if (CorrectFieldCount == 3 && CorrectField != FieldValue.Empty)
			return activePlayer;
	}

	if (playArea[0][0] != FieldValue.Empty && playArea[1][0] != FieldValue.Empty && playArea[2][0] != FieldValue.Empty &&
		playArea[0][1] != FieldValue.Empty && playArea[1][1] != FieldValue.Empty && playArea[2][1] != FieldValue.Empty &&
		playArea[0][2] != FieldValue.Empty && playArea[1][2] != FieldValue.Empty && playArea[2][2] != FieldValue.Empty)
			return GameResult.Draw;
	
	return GameResult.NoVictory;
}