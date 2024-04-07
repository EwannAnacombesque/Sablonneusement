///-- CREATE ELEMENTS OF THE CANVAS --///

let bubbled_notes_infos = [];
let lined_notes_infos = [];
let partitions_infos= [];

function createPartitions(){
  for(var i=partitions_constants[1];i<partitions_constants[1]+partitions_constants[0]*partitions_constants[2];i+=partitions_constants[2]){
    partitions_infos.push(i)
  }
}

function createLinedNotes(){
  for(var i=0;i<partitions_constants[0];i+=1){
    notes_count = int(random(0,10))
    lined_notes_infos.push([])
    
    for (var j=0;j<notes_count;j+=1){
      lined_notes_infos[i].push([-2 + random(0,1.7),random(screen_width*0.03,screen_width*0.04),random([0,1]),random([true,false])])
    }
  }
}

function createBubbledNotes(){
  for (var j=0;j<5;j+=1){
    bubbled_notes_infos.push([random(-1,1),random(0,1),0,random([false,true]),random([false,true]),random(0.8,1.4),random(0.7,1.5)])

}
}

///-- DRAW ELEMENTS OF THE CANVAS --///

function drawUpperBottle(x,y,h,color){
  // Set the color as default 
  fill(color)
  
  //--- Draw the neck of the bottle ---//
  
  rect(x,y,bottle_width*h,h)
  // Draw the ring
  rect(x-h*bottle_neck_factors[1],
       y+h*bottle_neck_factors[2]-overflow,
       h*(bottle_width+2*bottle_neck_factors[1]),
       h*bottle_neck_factors[3]+2*overflow)
  // Draw the round part of the ring (down one)
  arc(x+h*bottle_width/2,
      y+h*(bottle_neck_factors[2]+bottle_neck_factors[3]),
      h*(bottle_width+2*bottle_neck_factors[1]),
      h*bottle_neck_factors[4],
      0,PI)
  // Draw the round part of the ring (up one)
  arc(x+h*bottle_width/2,
      y+h*bottle_neck_factors[2],
      h*(bottle_width+2*bottle_neck_factors[1]),
      h*bottle_neck_factors[4],
      PI,0)
  // Draw the cork of the bottle
  arc(x+h*bottle_width/2,
      y+overflow,
      h*bottle_width,
      h*bottle_neck_factors[4],
      PI,0)
  
  
  //--- Draw the shoulder of the bottle ---//

  beginShape()
  // Top-right corner
  vertex(x+h*bottle_width,y+h*(1-bottle_body_factors[0]))
  // Bezier to bottom-right corner
  bezierVertex(x+h*bottle_width+h*bottle_body_factors[2],
               y+h*(1-bottle_body_factors[0]+bottle_body_factors[3]),
               x+h*bottle_width+h*bottle_body_factors[4],
               y+h*(1-bottle_body_factors[0]+bottle_body_factors[5]),
               x+h*(bottle_width+bottle_body_factors[1]),
               y+h)
  // Bottom-left corner
  vertex(x-h*bottle_body_factors[1],y+h)
  // Bezier to top-left corner
  bezierVertex(x-h*bottle_body_factors[4],
               y+h*(1-bottle_body_factors[0]+bottle_body_factors[5]),
               x-h*bottle_body_factors[2],
               y+h*(1-bottle_body_factors[0]+bottle_body_factors[3]),
               x,
               y+h*(1-bottle_body_factors[0]))
  endShape()
  
  //--- Draw the body of the bottle ---//
  
  rect(x-h*bottle_body_factors[1],
       y+h-overflow,
       h*(bottle_width+2*bottle_body_factors[1]),
       screen_height)

}

function drawLowerBottle(x,y,h,time){
  var fill_level = (0.75-punt_factors[2])*sin(time/15)**2
  var wave = cos(time)/7
  
  // Set the color as glass 
  fill(main_color)
  
  //--- Draw the body of the bottle ---//
  
  // Rect-main part
  rect(x,
       y,
       h*(bottle_width+2*bottle_body_factors[1]),
       h*punt_factors[0])
  // Very bottom, rounded
  ellipse(x+h*(bottle_width/2+bottle_body_factors[1]),
          y+h*punt_factors[0],
          h*(bottle_width+2*bottle_body_factors[1]),
          h*punt_factors[1])

  //--- Draw the liquid of the bottle ---//
  
  // Set the color as liquid color 
  fill(background_color)
  
  beginShape()
  // Bottom-left corner
  vertex(x+h*punt_factors[2],y+h*punt_factors[0])
  // Bezier to bottom-right corner
  bezierVertex(
    x+h*(bottle_width+2*bottle_body_factors[1]-punt_factors[2])*punt_factors[4],
    y+h*(punt_factors[0]+wave), // varie
    x+h*(bottle_width+2*bottle_body_factors[1]-punt_factors[2])*punt_factors[3],
    y+h*(punt_factors[0]-wave),
    x+h*(bottle_width+2*bottle_body_factors[1]-punt_factors[2]),y+h*punt_factors[0]
  )
  // Top-left corner
  vertex(x+h*(bottle_width+2*bottle_body_factors[1]-punt_factors[2]),y+h*(punt_factors[2]+fill_level))
  // Bezier to top-right corner
  bezierVertex(
    x+h*(bottle_width+2*bottle_body_factors[1]-punt_factors[2])*punt_factors[3],
    y+h*(punt_factors[2]+wave+fill_level),
    x+h*(bottle_width+2*bottle_body_factors[1]-punt_factors[2])*punt_factors[4],
    y+h*(punt_factors[2]-wave+fill_level),
    x+h*punt_factors[2],
    y+h*(punt_factors[2]+fill_level)
  )
  endShape()

}
  
function drawNote(x,y,w,hollowed,reversed){
  //--- Draw the notehead ---// 
  
  push()
  // Set the color as main one
  fill(main_color)
  // Draw the rotated ellipse 
  translate(x,y)
  rotate(-PI/13)
  ellipse(0,0,w,w*note_factors[0])
  pop()
  
  //--- Draw the stem ---//
  if (reversed){
    rect(x+cos(-PI/13)*w/2-w*note_factors[2],y-w*note_factors[1]-overflow,w*note_factors[2],w*note_factors[1])
    arc(x+cos(-PI/13)*w/2-w*note_factors[2]/2,y-w*note_factors[1],w*note_factors[2],w*note_factors[2]/1.5,PI,0)
  }
  else{
    rect(x+cos(-PI/13)*w/2-w*note_factors[2],y+w*note_factors[1]-overflow,w*note_factors[2],-w*note_factors[1]-overflow)
    arc(x+cos(-PI/13)*w/2-w*note_factors[2]/2,y+w*note_factors[1]-overflow,w*note_factors[2],w*note_factors[2]/1.5,0,PI)
  }
  
  if (!hollowed){
    return 0
  }
  
  push()
  // Set the color back to background color
  fill(background_color)
  // Draw an inner rotated ellipse, to hollow the notehead
  translate(x,y)
  rotate(PI/13)
  ellipse(0,0,w*note_factors[3],w*note_factors[0]*note_factors[3])
  pop()
}

function drawPartition(y,dx,time,lined_notes){
  push()
  // Set the drawing parameters
  noFill()
  strokeWeight(4)
  stroke(main_color)
  
  // Save the bezier curve points of the curve
  var py1 = y+dx*(partition_factors[1]+cos(time*0.3)/20);
  var py2 = y+dx*(partition_factors[3]+cos(time*0.1)/20);
  var py3 = y+dx*partition_factors[4]
  var px1 = dx*partition_factors[0]
  var px2 = dx*partition_factors[2]
  var px3 = dx
  
  // Save the partition's curve
  bezier(0,y,px1,py1,px2,py2,px3,py3)
  
  
  //--- Draw the notes on the curve ---//
  
  for (var i=0;i<lined_notes.length;i+=1){
    // Get the note values required to draw
    var note_t = lined_notes[i][0];
    var note_x = getBezierPoint(note_t,0,px1,px2,px3)
    var note_y = getBezierPoint(note_t,y,py1,py2,py3)
    // Draw the note
    drawNote(note_x,note_y,lined_notes[i][1],lined_notes[i][2],lined_notes[i][3])
  }

  pop()
}

function drawCorkscrew(x,y,h,a,n,f,k,t){
  // Set color as main color
  fill(main_color)
  
  // Var to center the corkscrew
  var dx = x+h*bottle_width/2
  // Eventually draw the whole circle thing
  for (var i=0;i<n;i+=1){
    circle(dx+a*cos(t*f+i/k),y+i*h/n,screen_width*(0.013))
  }
  
}

function drawHorse(x,y,h,time){
  // Set the color as default   
  fill(main_color)
  
  //--- Draw the horse mane ---// 

  for(i=0;i<bubbled_notes_infos.length;i+=1){
    // Eventually draw the note at pretty random place
    drawNote(x+h*bubbled_notes_infos[i][0]*0.5,y+h*(-0.5+bubbled_notes_infos[i][1]*0.2),15,bubbled_notes_infos[i][3],bubbled_notes_infos[i][4])
    // Make the note go up
    updateBubbledNotes(i)
  }

  //--- Draw the horse head shape ---// 
  
  beginShape()
  // Draw the first point, in the neck
  vertex(x+h*horse_x_factors[0],y+h*horse_y_factors[0])
  // The shape is constitued of multiple Bezier Curves
  for (var i=1;i<=21;i+=3){
    bezierVertex(
    x+h*horse_x_factors[i],
    y+h*horse_y_factors[i],
    x+h*horse_x_factors[i+1],
    y+h*horse_y_factors[i+1],
    x+h*horse_x_factors[i+2],
    y+h*horse_y_factors[i+2])
  }

  endShape()
  
  //--- Draw the horse eyes ---// 
  
  // Little ones
  drawEye(x-h*0.55,y+h*0.1,h*0.5,0.34,time*0.8)
  drawEye(x-h*0.55,y-h*0.55,h*0.5,0.125,time)
  // Bigger one
  drawEye(x-h*0.4,y-h*0.3,h*0.80,0.24,time*0.6)
  
}

function drawEye(x,y,w,delay,time){
  // Set the color as background 
  fill(background_color)
  
  // Inherent eye-time 
  var t = abs(min(0.5+cos(delay+time*0.5),1));
  
  //--- Draw the eye shape ---// 
  
  beginShape()
  
  // Draw the left part of the eye
  vertex(x,y)
  
  // Interpolate between the closed eye
  // and the fully open one, described
  // by the bezier curve
  for(var i=0;i<=12;i+=6){
    bezierVertex(x+w*((1-t)*eyes_factors[i]+t*eyes_closed_factors[i]),
                 y+w*((1-t)*eyes_factors[i+1]+t*eyes_closed_factors[i+1]),
                 x+w*((1-t)*eyes_factors[i+2]+t*eyes_closed_factors[i+2]),
                 y+w*((1-t)*eyes_factors[i+3]+t*eyes_closed_factors[i+3]),
                 x+w*((1-t)*eyes_factors[i+4]+t*eyes_closed_factors[i+4]),
                 y+w*((1-t)*eyes_factors[i+5]+t*eyes_closed_factors[i+5]))
  }
  endShape()
  
  //--- Draw the iris and the pupil ---//
  
  // Set the color as default 
  fill(main_color)
  
  // Get the angle between the mouse and the center of the eye
  var angle= getMouseAngle(x+w/2,y)
  
  // The iris will be circumscribed in an ellipse
  var dx = -w/5*sin(angle)
  var dy = -w/8*cos(angle)
  
  // Draw the iris
  circle(x+dx+w/2,y+dy,w/4)
}

///-- UPDATE ELEMENTS OF THE CANVAS --///

function updateNotes(i){
    for (var j=0;j<lined_notes_infos[i].length;j+=1){
      lined_notes_infos[i][j][0] += 0.01
      
      if (lined_notes_infos[i][j][0] >= 0.65){
        lined_notes_infos[i][j][0] = -2 + random(0,1.7)
      }
    }
}

function updateBubbledNotes(i){

    bubbled_notes_infos[i][2] += 0.01*bubbled_notes_infos[i][6];
    bubbled_notes_infos[i][1] -= 0.1*bubbled_notes_infos[i][5];
    if (bubbled_notes_infos[i][2]>1.5){
      bubbled_notes_infos[i][0] = random(-1,1);
      bubbled_notes_infos[i][1] = random(0,1);
      bubbled_notes_infos[i][2] = 0;
      bubbled_notes_infos[i][3] = random([false,true]);
      bubbled_notes_infos[i][4] =random([false,true]);
      bubbled_notes_infos[i][5] = random(0.8,1.4)
      bubbled_notes_infos[i][6] = random(0.7,1.5)

  }
}
