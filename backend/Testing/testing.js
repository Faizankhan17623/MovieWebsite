// // const date = require('date-and-time')
// // console.log("This is printing the date object",date)

// // const now = new Date()
// // console.log("This is the original date object",now)
// // let format = date.format(now,'YYYY/MM/DD HH:mm:ss')
// // console.log("This is the formatted date",format)


// // const pattern = date.compile('ddd, MMM DD YYYY');
// // let ps = date.format(now, pattern);  
// // console.log("This is the pattern that is been printed",ps)

// // console.log("This is the pattern printed",pattern)



// // let text = "     Hello World!     ";
// // let result = text.trim();
// // console.log("This is the test",text)
// // console.log("This is the result",result)




// // let text = "Hello world!";
// // let result = text.substring(1, 4);
// // console.log(result)
// // \



// // const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);
// // console.l?og(formatNumber(10000)); 
// <button id="rzp-button1">Pay</button>
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
// <script>
// var options = {
//     "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
//     "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise.
//     "currency": "INR",
//     "name": "Acme Corp",
//     "description": "Test Transaction",
//     "image": "https://example.com/your_logo",
//     "account_id": "acc_Ef7ArAsdU5t0XL",
//     "order_id": "order_DBJOWzybf0sJbb", //This is a sample Order id. Pass the `id` obtained in the response of Step 1.
//     "handler": function (response){
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature)
//     },
//     "prefill": {
//         "name": "Gaurav Kumar",
//         "email": "gaurav.kumar@example.com",
//         "contact": "9000090000"
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#3399cc"
//     }
// };
// var rzp1 = new Razorpay(options);
// rzp1.on('payment.failed', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
// });
// document.getElementById('rzp-button1').onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
// }
// </script>