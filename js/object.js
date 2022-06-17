
document.addEventListener("DOMContentLoaded", function () {

  let hey = "fool"

  let cool = {
    thingOne: "bro",
    thingTwo: "slow",
    thingThree: hey
  }

  console.log(cool);

  let three = cool;

  three.thingOne = "something";

  let reassign = function (item) {
    item.thingOne = "new";
  }

  reassign(three);

  // loop through letters of a string using range based for loop
  for (letter of cool.thingOne) {
    console.log(cool.thingOne.at(cool.thingOne.indexOf(letter)));
  }

  class Polygon {
    constructor(height, width) {
      this.area = height * width;
    }
    cool = function () {
      console.log("hey");
    }
  }

  class Rect extends Polygon {

  }

  let me = new Rect(4, 3);

  console.log(me);
  me.cool();

});
