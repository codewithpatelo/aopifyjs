declare module 'topsis' {
    interface TopsisOptions {
      weights: number[];
      impacts: ('+' | '-')[];
    }
  
    function topsis(
      matrix: number[][],
      options: TopsisOptions
    ): number[];
  
    export = topsis;
  }
  