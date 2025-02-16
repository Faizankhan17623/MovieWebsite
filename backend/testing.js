// const date = require('date-and-time')
// console.log("This is printing the date object",date)

// const now = new Date()
// console.log("This is the original date object",now)
// let format = date.format(now,'YYYY/MM/DD HH:mm:ss')
// console.log("This is the formatted date",format)


// const pattern = date.compile('ddd, MMM DD YYYY');
// let ps = date.format(now, pattern);  
// console.log("This is the pattern that is been printed",ps)

// console.log("This is the pattern printed",pattern)



// let text = "     Hello World!     ";
// let result = text.trim();
// console.log("This is the test",text)
// console.log("This is the result",result)




// let text = "Hello world!";
// let result = text.substring(1, 4);
// console.log(result)
// \



const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);
console.log(formatNumber(10000)); 

