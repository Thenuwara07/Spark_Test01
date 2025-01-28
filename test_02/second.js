function isPalindrome(str) {
  // Reverse the string
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  // Check if the original string equals to reversed 
  return str === reversed;
}

//sample usages
console.log(isPalindrome("madam")); 
console.log(isPalindrome("hello")); 
