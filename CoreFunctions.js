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

function MakeMove(x, y, field)
{
	if (playArea[x][y] != FieldValue.Empty)
	{
		alert('This move is not allowed!');
		return;
	}
		
	playArea[x][y] = activePlayer;
	
	if (activePlayer == Sign.Circle)
		field.innerHTML = "<DIV class=\"CircleField\">";
	else
		field.innerHTML = "<table><tr><td><DIV class=\"CrossBottomRight\" /></td><td><DIV class=\"CrossBottomLeft\" /></td></tr><tr><td><DIV class=\"CrossTopRight\" /></td><td><DIV class=\"CrossTopLeft\" /></td></tr></table>";
	
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