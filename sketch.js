var calender = [];
var spacing;
var xOffset;
var yOffset;
var calenderFont;


function preload() {
  calenderFont = loadFont('ChaparralPro-Bold.otf');
}   

function setup() {
  createCanvas(windowWidth,windowHeight);

  spacing = Math.round((windowWidth * .75) / 30);
  xOffset = Math.round((windowWidth - (spacing * 30)) / 2)  + Math.round(Math.round(spacing * 2.5) / 2);
  yOffset = Math.round((windowHeight - (spacing * 11)) / 2);

  console.log("Spacing: " + spacing)

  if(localStorage.getItem('calender') != null) {
    calender = JSON.parse(localStorage.getItem('calender'));
  } else {
    var today = new Date();
    var dd = today.getDate() - 1; //array indexing
    var mm = today.getMonth(); 

    var daysOfEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for(var i = 0; i < daysOfEachMonth.length; i++) {
      var thisMonth = [];
      for(var j = 0; j < daysOfEachMonth[i]; j++) {
        thisMonth.push((i > mm || (i == mm && j >= dd) ? 0 : 1));
      }
      calender.push(thisMonth);
    }

    localStorage.setItem('calender', JSON.stringify(calender));
  }
}

function swapDay(month, day, swapTo) {
  if(swapTo != null) {
    calender[month][day] = swapTo;
  } else {
    calender[month][day] = (calender[month][day] ? 0 : 1);
  }
  localStorage.setItem('calender', JSON.stringify(calender));
}


function draw() {
  background('#f5f5e7');

  noStroke();

  fill('#494926');

  var months = ['jan','feb', 'mar', 'apr', 'may','jun','jul','aug','sep', 'oct', 'nov','dec'];
  textFont(calenderFont);

  for(var i = 0; i < calender.length; i++) {
    for(var j = 0; j < calender[i].length; j++) {

      if(calender[i][j] == 1) {
        ellipse((j * spacing) + xOffset, (i * spacing) + yOffset, Math.round(spacing * .75), Math.round(spacing * .75));
      } else {

        let dist = pythag((j * spacing) + xOffset, (i * spacing) + yOffset);

        
        let size = 2 + (spacing * (spacing / dist));
        if (dist <= (spacing / 2)) size = Math.round(spacing / 2);

        if(dist > (spacing / 2)) size = Math.round(spacing / 10);

        ellipse((j * spacing) + xOffset, (i * spacing) + yOffset, size, size);
      }
    }
    textSize(spacing - 5);
    text(months[i], xOffset - Math.round(spacing * 2.5), (i * spacing) + yOffset + (Math.round(spacing / 5)));
  }
}

function pythag(ellipseX, ellipseY) {
  let x = mouseX;
  let y = mouseY;
  
  if (x==NaN) {
    return 1;
  } else {
      let leg1 = Math.abs(x - ellipseX);
      let leg2 = Math.abs(y - ellipseY);
      let pyth = Math.pow(leg1, 2) + Math.pow(leg2, 2);
      return Math.sqrt(pyth);
  }
}

function mousePressed() {
  x = mouseX;
  x -= xOffset;
  x = Math.round(x / spacing);

  y = mouseY;
  y -= yOffset;
  y = Math.round(y / spacing);

  print(mouseY +  ", " + mouseX)
  print(y + ", " + x)

  if(x >= 0 && y >= 0 && y < calender.length && x < calender[y].length) {
    swapDay(y, x);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  spacing = Math.round((windowWidth * .75) / 30);
  xOffset = Math.round((windowWidth - (spacing * 30)) / 2)  + Math.round(Math.round(spacing * 2.5) / 2);
  yOffset = Math.round((windowHeight - (spacing * 11)) / 2);

  console.log("Spacing: " + spacing)
}

