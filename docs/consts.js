const SCRNWIDTH = Math.max(window.screen.width,window.screen.height);
const SCRNHEIGHT = Math.min(window.screen.width,window.screen.height)
const GAMEWIDTH = Math.min(SCRNWIDTH,SCRNHEIGHT * 12 / 6)*.95;
const GAMEHEIGHT = Math.min(SCRNHEIGHT,SCRNWIDTH * 6 /12)*.95;
const BTNSIZE = GAMEHEIGHT/10;
const PLATFORMHEIGHT = GAMEHEIGHT / 4;
const PLATFORMWIDTH = GAMEWIDTH / 4;
const BASEHEIGHT = 30;
const groundcoord = GAMEHEIGHT-BASEHEIGHT;
const platformcoord = groundcoord-PLATFORMHEIGHT;
const forkx = PLATFORMWIDTH*3/4;
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
const citadelx = GAMEWIDTH - TRUNKLONGl/2; 
const LEVELS = 3;
// "Death" speeds:
const PIGDIESPEED = GAMEHEIGHT * 3 / 500;
const CRATEBREAKSPEED = GAMEHEIGHT / 100;
const TRUNKBREAKSPEED = GAMEHEIGHT * 3 / 250;