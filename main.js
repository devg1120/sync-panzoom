import './style.css'

  import {panzoom} from './panzoom/src/panzoom.js';
/*
  document.addEventListener("DOMContentLoaded", (e) => {
    panzoom('#element1', {bound:'none'});
    panzoom('#element2', {bound:'inner'});
    panzoom('#element3', {bound:'outer'});
    panzoom('#element4', {bound:'outer'});
    panzoom('#child4', {bound:'inner'});
    // multi sync panzooom
    panzoom('#element51', {bound:'outer'});
    panzoom('#child51', {bound:'inner'});
    panzoom('#element52', {bound:'outer'});
    panzoom('#child52', {bound:'inner'});
  });
*/


  document.addEventListener("DOMContentLoaded", (e) => {
    panzoom('#element1', {bound:'none'});
    panzoom('#element2', {bound:'inner'});
    panzoom('#element3', {bound:'outer'});
    panzoom('#element4', {bound:'outer'});
    panzoom('#child4', {bound:'inner'});
    // multi sync panzooom
    let sync1 = panzoom('#element51', {bound:'outer'});
    panzoom('#child51', {bound:'inner'});
    let sync2 = panzoom('#element52', {bound:'outer'});
    panzoom('#child52', {bound:'inner'});
    sync1("set", [sync2]);
    sync2("set", [sync1]);
    //sync1.test("OKOK");

  });

