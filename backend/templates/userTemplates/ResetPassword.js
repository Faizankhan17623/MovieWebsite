const ResetPasswordTemplate = (password) => {
	return `<!DOCTYPE html>
	<html>	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="message">The password is been updates</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Dear user ${username} your password  has been updated</p>
				<p>The new password image is ${password}</p>
			</div>
			<div class="support">if This has not been done by you please contact our customer support  <a
					href="mailto:faizankhan901152@gmail.com">Contact us </a>. We are here to help!</div>
		</div>
	</body>
	</html>`;
};
module.exports = ResetPasswordTemplate;