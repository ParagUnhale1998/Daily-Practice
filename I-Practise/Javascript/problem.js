// function sumOfNaturals(n) {
//     // Base case: if n is 1, return 1
//     if (n === 1) {
//       return 1;
//     } else {
//       // Recursive case: sum(n) = n + sum(n-1)
//       return n + sumOfNaturals(n - 1);
//     }
//   }
  
//   // Example usage: Calculate the sum of natural numbers up to 4
//   const result = sumOfNaturals(5);
//   console.log(result); // Output: 10 (1 + 2 + 3 + 4)
  

function infiniteCurry(x) {
    return function(y) {
      // This can continue indefinitely...
      return infiniteCurry(x + y);
    };
  }
  
  // Usage of infinite currying
  const result = infiniteCurry(1)(2) // Continues indefinitely
  
  console.log(result); // Output: A function that keeps currying
  