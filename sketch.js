var calender = [];
            

function setup() {
  createCanvas(windowWidth,windowHeight);

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

  for(var i = 0; i < calender.length; i++) {
    for(var j = 0; j < calender[i].length; j++) {

      if(calender[i][j] == 1) {
        ellipse((j * 20) + 20, (i * 20) + 20, 15, 15);
      } else {

        let dist = pythag((j * 20) + 20, (i * 20) + 20);

        
        let size = 2 + (20 * (20 / dist));
        if (size > 10) size = 10;

        if(dist > 10) size = 2;

        ellipse((j * 20) + 20, (i * 20) + 20, size, size);
      }
    }
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
  x -= 20;
  x = Math.round(x / 20);

  y = mouseY;
  y -= 20;
  y = Math.round(y / 20);

  print(mouseY, ", " + mouseX)
  print((mouseY - 20) / 20 + ", " + (mouseX - 20) / 20)
  print(y + ", " + x)

  swapDay(y, x);
}

