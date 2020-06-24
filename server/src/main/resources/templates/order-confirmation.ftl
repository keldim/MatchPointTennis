<html>

<head>
	<title>Campania Pizza Order Confirmation Email</title>
</head>

<body>
	<span>
		Thank you for your order. :)<br>
		Here is your summary.<br><br>
	</span>
	

	<span> 
		First Name: ${firstName}<br> 
		Last Name: ${lastName}<br> 
		Phone Number: ${phoneNumber}<br> 
		Email: ${email}<br><br>
	</span>
	
	<span> 
		${address1}<br> 
		${address2}<br> 
		${city}, ${state} ${zipcode}<br><br>
	</span>
	
	<span>
		card type<br>
		${cardNumber last 4 numbers}
	</span>
        
        model.put("cardNumber", request.getHeader("cardNumber"));
        
</body>
</html>