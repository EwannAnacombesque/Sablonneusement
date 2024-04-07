const screen_ratio = 9/16;
const screen_width = 980;
const screen_height = screen_width*screen_ratio;
const overflow = 1;

let time = 0;

function setup() {
  createCanvas(screen_width, screen_height);
  main_color = color(0,0,0);
  background_color = color(238,229,229)
  
  createPartitions()
  createLinedNotes()
  createBubbledNotes()
}
    
function draw() {
  // Clear the canvas
  background(background_color)
  
  // Draw elements of the canvas
  drawMusicElements()
  drawBottles()
  drawHorse(screen_width*0.97,screen_height*0.4,screen_height*0.2,time)
  
  // Update time
  time += 0.1
}

function drawBottles(){
  noStroke()
  // Draw the upper parts 
  drawLowerBottle(screen_width*0.07,0,screen_width*0.2,time)
  drawLowerBottle(screen_width*0.286,0,screen_width*0.114,time*1.3)
  drawLowerBottle(screen_width*0.442,0,screen_width*0.143,time*0.7+5)
  
  // Draw the lower parts
  drawUpperBottle(screen_width*0.64,screen_width*0.143,screen_width*0.214,main_color)
  drawUpperBottle(screen_width*0.64,screen_width*(0.29+cos(0.5*time+0.1)*0.01),screen_width*0.114,background_color)
  drawUpperBottle(screen_width*0.665,screen_width*(0.41+cos(0.7*time+0.3)*0.005),screen_width*0.114,main_color)
  
  // Addons
  drawCorkscrew(screen_width*0.64,0,screen_width*0.214,10,20,1,1,time)
}

function drawMusicElements(){
  for (var i=0;i<partitions_constants[0];i+=1){
    drawPartition(partitions_infos[i],screen_width,time,lined_notes_infos[i])
    updateNotes(i)
  }
}