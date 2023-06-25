void setup(){
  size(500,500); 
  background(0); 
  strokeWeight(0.6); 
  smooth();
}// f

void draw(){
  int centX = 250; 
  int centY = 250;  // int(random(1000));
  float x, y;

  background(0);

  for (int i = 0; i<80; i++){
    // draws 100 spirals 
    float lastx = -999; 
    float lasty = -999; 
    float radiusNoise = random(100);
    float radius = random(1000);
  
    stroke(random(250), random(100), random(255), 90);
    int startangle = int(random(360)); 
    int endangle = 14 + int(random((1440) + random(100))); 
    int anglestep = 3 + int(random(3)); 
    
          // rotate(1);
    rotateX(1);

    for(float ang = startangle; ang <= endangle; ang += anglestep){
      radiusNoise += 0.05; 
      radius += 0.05; 
      float thisRadius = noise(radius) + (noise(radiusNoise) * 400) - 300;
      float rad = radians(ang);
      x = centX + ((thisRadius) * cos(rad)); 
      y = centY + (thisRadius * sin(rad)); 
      
      if(lastx > -999){
        line(x,y,lastx,lasty);
      }// i 
      lastx = x; 
      lasty = y;
    }// 4
  }// 4  
}// f
