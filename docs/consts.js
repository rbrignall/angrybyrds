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
///////////////////////
//
//   svg icons
//
///////////////////////
const PADLOCKSVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="48px" height="48px" viewBox="-5 -2 24 24"%3E%3Cpath fill="currentColor" d="M12 10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2V5a5 5 0 1 1 10 0v5zm-5 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm3-7V5a3 3 0 1 0-6 0v5h6z"%2F%3E%3C%2Fsvg%3E';//"assets/padlock.png");
const CLOSESVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" viewBox="0 0 24 24"%3E%3Cpath fill="%23e92" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"%2F%3E%3C%2Fsvg%3E';//"assets/close.png");
const SOUNDONSVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" viewBox="0 0 24 24"%3E%3Cg transform="rotate(180 12 12)"%3E%3Cpath fill="none" stroke="%23e92" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 14.959V9.04C2 8.466 2.448 8 3 8h3.586a.98.98 0 0 0 .707-.305l3-3.388c.63-.656 1.707-.191 1.707.736v13.914c0 .934-1.09 1.395-1.716.726l-2.99-3.369A.98.98 0 0 0 6.578 16H3c-.552 0-1-.466-1-1.041ZM16 8.5c1.333 1.778 1.333 5.222 0 7M19 5c3.988 3.808 4.012 10.217 0 14"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';//"assets/sound.png"
const SOUNDOFFSVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" viewBox="0 0 24 24"%3E%3Cg transform="rotate(180 12 12)"%3E%3Cg fill="none" stroke="%23555" stroke-linecap="round" stroke-width="2"%3E%3Cpath d="m22 15l-6-6m6 0l-6 6"%2F%3E%3Cpath stroke-linejoin="round" d="M2 14.959V9.04C2 8.466 2.448 8 3 8h3.586a.98.98 0 0 0 .707-.305l3-3.388c.63-.656 1.707-.191 1.707.736v13.914c0 .934-1.09 1.395-1.716.726l-2.99-3.369A.98.98 0 0 0 6.578 16H3c-.552 0-1-.466-1-1.041Z"%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';//"assets/soundoff.png"
const NEXTSVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" viewBox="0 0 256 256"%3E%3Cpath fill="%23e92" d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm56.6 110.6l-40 28a8.6 8.6 0 0 1-4.6 1.4a8 8 0 0 1-8-8v-28a8.2 8.2 0 0 1-3.4 6.6l-40 28A8.6 8.6 0 0 1 84 164a8 8 0 0 1-8-8v-56a8.1 8.1 0 0 1 4.3-7.1a8 8 0 0 1 8.3.5l40 28a8.2 8.2 0 0 1 3.4 6.6v-28a8.1 8.1 0 0 1 4.3-7.1a8 8 0 0 1 8.3.5l40 28a8.1 8.1 0 0 1 0 13.2Z"%2F%3E%3C%2Fsvg%3E';//"assets/next.png"
const MENUSVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" viewBox="0 0 24 24"%3E%3Cpath fill="%23e92" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M6 7h12v2H6V7m0 4h12v2H6v-2m0 4h12v2H6v-2Z"%2F%3E%3C%2Fsvg%3E';//"assets/menu.png"
const REFRESHSVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" viewBox="0 0 24 24"%3E%3Cpath fill="%23e92" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m6 9h-5l1.81-1.81A3.94 3.94 0 0 0 12 8a4 4 0 1 0 3.86 5h2.05A6 6 0 1 1 12 6a5.91 5.91 0 0 1 4.22 1.78L18 6Z"%2F%3E%3C%2Fsvg%3E';//"sprites/menu_refresh.png"
const ABOUTSVG = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" viewBox="0 0 24 24"%3E%3Cpath fill="%23e92" d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"%2F%3E%3C%2Fsvg%3E';

