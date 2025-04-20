const TicketTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
	</head>
	<body>
		<div class="container">
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with movie Website. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 1 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us via the contact support  <a
					href="mailto:faizankhan901152@gmail.com">Contact us </a>. We are here to help!</div>
		</div>
	</body>
	</html>`
};
module.exports = TicketTemplate 





{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.1/jspdf.umd.min.js"></script>
<script src="./Checks.js"></script> */}






// // <link rel="stylesheet" href="./Style.css">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css" integrity="sha512-kJlvECunwXftkPwyvHbclArO8wszgBGisiLeuDFwNM8ws+wKIw0sv1os3ClWZOcrEB2eRXULYUsm8OVRGJKwGA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    // <div class="message">Payment Succesfull mail</div>
    // <div class="one">
    //     <p>Show Date  ${otp.Showdate}</p>
    //     <p>Show time  ${otp.time}</p>
    // </div>
    // <div class="two"></div>
    // <div class="three"></div>
{/* <i class="ri-arrow-down-wide-line"></i> */}