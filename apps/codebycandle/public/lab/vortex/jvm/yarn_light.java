import processing.core.*; 
import processing.xml.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class yarn_light extends PApplet {

public void setup(){
  size(500,500); 
  background(0); 
  strokeWeight(0.6f); 
  smooth();
}// f

public void draw(){
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
    int startangle = PApplet.parseInt(random(360)); 
    int endangle = 14 + PApplet.parseInt(random((1440) + random(100))); 
    int anglestep = 3 + PApplet.parseInt(random(3)); 
    
          // rotate(1);
    rotateX(1);

    for(float ang = startangle; ang <= endangle; ang += anglestep){
      radiusNoise += 0.05f; 
      radius += 0.05f; 
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
  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#FFFFFF", "yarn_light" });
  }
}
