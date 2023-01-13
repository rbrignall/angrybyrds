
const GAMEWIDTH = Math.min(1200, window.innerWidth,window.innerHeight * 12 / 6);
const GAMEHEIGHT = Math.min(600, window.innerHeight,window.innerWidth * 6 /12);
const PLATFORMHEIGHT = GAMEHEIGHT / 4;
const PLATFORMWIDTH = GAMEWIDTH / 4;
const BASEHEIGHT = 30;
const groundcoord = GAMEHEIGHT-BASEHEIGHT;
const platformcoord = groundcoord-PLATFORMHEIGHT;
const citadelx = GAMEWIDTH - 100; 
const forkx = PLATFORMWIDTH*2/3;
const BYRDr = GAMEHEIGHT / 10;
const PIGr = GAMEHEIGHT * 3 / 25;
const PIGy = PIGr;
const PIGx = PIGy * 40 / 47;
const CRATEr = GAMEHEIGHT * 7 / 50;
const TRUNKLONGl = GAMEWIDTH / 4;
const TRUNKw = GAMEHEIGHT / 25;
const FORKh = GAMEHEIGHT/2.5;
const FORKw = FORKh * 3 / 25;
const SMALLFORKh = FORKh*3/5;
const SMALLFORKw = FORKw/2;
const CHANCES = 3;
// "Death" speeds:
const PIGDIESPEED = GAMEHEIGHT * 3 / 500;
const CRATEBREAKSPEED = GAMEHEIGHT / 100;
const TRUNKBREAKSPEED = GAMEHEIGHT * 3 / 250;