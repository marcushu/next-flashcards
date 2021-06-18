// Instantiate the class with the total number of available random numbers.
// calling getRandOffset() will return a random number within the range.
// Repeated calls to getRand are guaranteed not to return the same number
// unless consecutive calls exeed the number of numbers, in which case
// only the 'ends' will produce a possible (though unlikely in large arrays)
// repeat.

class RandomOffset {
    offsetArray = <number[]>[];
    numberOptions;
  
    // Construct with the number of available random numbers
    constructor(numOptions: number) {
      this.numberOptions = numOptions;
    }
  
    // load the offset offsetArray
    //
    loadOffsetArray = () => {
      for (let i = 0; i < this.numberOptions; i++) {
        this.offsetArray.push(i);
      }
    }
  
    // Retrive a number.  In the case of an empty array (no
    // random numbers available), 0 will be retuned.
    //
    getRandOffset = () => {
      // re-load the array if we have used up all the numbers
      if(!this.offsetArray.length)
        this.loadOffsetArray();
  
      const randomOffsetIndex = Math.floor(Math.random() * this.offsetArray.length);
      const randOffset = this.offsetArray[randomOffsetIndex];
  
      // remove the accessed element to prevent re-selection.
      this.offsetArray.splice(randomOffsetIndex, 1);
  
      return typeof randOffset == "undefined" ? 0 : randOffset;
  
    }
  }

  export default RandomOffset;
  