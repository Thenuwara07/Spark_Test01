function findSecondLargest(arr) {
    // Check if array has at least two elements
    if (arr.length < 2) {
      return "Array should have at least two elements";
    }
  
    let largest = arr[0];

    // Initialize second largest to large minus value
    let secondLargest = -Infinity;
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > largest) { // If current element is larger than the largest,
        secondLargest = largest;
        largest = arr[i];

      } else if (arr[i] > secondLargest && arr[i] !== largest) {  // If current element > secondLargest but not equal to largest,
        secondLargest = arr[i];
      }
    }
  
    // Check if a second largest number was found
    if (secondLargest === -Infinity) {
      return "There is no second largest element";
    }
  
    return secondLargest;
  }
  
  // Sample case
  console.log(findSecondLargest([10, 5, 8, 12, 3, 12])); 
  console.log(findSecondLargest([1, 2, 3, 4, 5])); 
  console.log(findSecondLargest([5, 5, 5, 5])); 
  console.log(findSecondLargest([1])); 