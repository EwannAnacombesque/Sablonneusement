
///-- DEFINING DECOR CONSTANT --///

const bottle_neck_factors = [0.37,0.03,0.07,0.125,0.09]
const bottle_body_factors = [0.45,0.3125,0.08,0.10,0.30,0.2125]
const punt_factors = [0.87,0.24,0.10,0.8,0.1]
const bottle_width = 0.37

const note_factors = [0.62,1.9,0.10,0.65]
const partition_factors = [0.30,0.2,0.7,-0.2,0.1]
const partitions_constants = [4,0.32*screen_width,0.036*screen_width];

const horse_x_factors = [90/220,0/220,18/220,0,-24/220,-39/220,-48/220,-58/220,-71/220,-93/220,-132/220,-140/220,-154/220,-245/220,-184/220,-214/220,-143/220,-109/220,-42/220,0,51/220,90/220]
const horse_y_factors = [202/220,142/220,58/220,0,40/220,82/220,135/220,142/220,135/220,143/220,95/220,-9/220,-99/220,-95/220,-118/220,-123/220,-148/220,-187/220,-210/220,-1,-207/220,-198/220]

const eyes_factors = [25/84,-18/84,59/84,-19/84,0.85,-5/84,67/84,16/84,28/84,19/84,0,0]
const eyes_closed_factors = [33/84,-3/84,68/84,-5/84,0.85,-5/84,68/84,-5/84,33/84,-3/84,0,0]

///-- MATH STUFF --///

function getBezierPoint(t,p1,p2,p3,p4){
    return (p1*pow(1-t,3)+3*p2*t*pow(1-t,2)+3*p3*t*t*(1-t)+p4*pow(t,3));
}

function getMouseAngle(x,y){
  return atan2(x-mouseX,y-mouseY)
}

///-- UX --///

function mousePressed(){
  temp_color = main_color
  main_color = background_color;
  background_color = temp_color;
}
