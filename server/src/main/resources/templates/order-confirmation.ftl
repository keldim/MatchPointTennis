<html>

<head>
	<title>Match Point Tennis Confirmation Email</title>
</head>

<body>

	<span>
		Thank you for your order. :)<br>
		Here is your summary.<br><br>
	</span>

	<span class="row">
  		<span style="float: left; width: 33.33%;">
  			Contact Info:<br> 
			${firstName}&nbsp;${lastName}<br> 
			${phoneNumber}<br> 
			${email}<br><br>
  		</span>
  		<span style="float: left; width: 33.33%;">
  			Shipping Address:<br>
			${address1}<br> 
			${address2}<br> 
			${city}, ${state} ${zipcode}<br><br>
  		</span>
  		<span style="float: left; width: 33.33%;">
  			Paid With:<br>
			${cardType}<br>
			${cardLastFourNumbers}<br><br>
  		</span>
	</span><br><br>
	
	<#function calculatePriceForRacquet string mainItem>
  		<#if string?contains("$17.95")>
    		<#return 17.95 + mainItem?number>
		<#elseif string?contains("$18.95")>
  			<#return 18.95 + mainItem?number>
		<#elseif string?contains("$20.95")>
  			<#return 20.95 + mainItem?number>
  		<#else>
  			<#return mainItem?number>
  		</#if>
	</#function>
	
	<#function calculateTotalForItem price quantity>
    	<#return price?number * quantity?number>
	</#function>
	
	
<table width="100%">
	<thead>
		<tr>
			<th style="border-bottom: 1px solid #ddd;">Name</th>
			<th style="border-bottom: 1px solid #ddd;">Detail</th>
			<th style="border-bottom: 1px solid #ddd;">Total</th>
		</tr>
	</thead>
	<tbody>
		<#list selectedRacquets as racquet>
			<tr>
				<td data-title="Name" style="border-bottom: 1px solid #ddd;">
        			${racquet.name}
      			</td>
				<td data-title="Detail" style="border-bottom: 1px solid #ddd;">
			  		<small>
            			Main Item - $${racquet.price}<br>
            			Grip Size: ${racquet.gripSize}<br>
            			String: ${racquet.racquetString}<br>
            			<#if racquet.racquetString != 'Unstrung'>
            				<span>Tension: ${racquet.tension}</span><br>
            			</#if>
          			</small>
				</td>
				<td data-title="Total" style="border-bottom: 1px solid #ddd;">
			 		$${calculatePriceForRacquet(racquet.racquetString, racquet.price)} x ${racquet.quantity} = 
        			$${calculateTotalForItem(calculatePriceForRacquet(racquet.racquetString, racquet.price), racquet.quantity)}
				</td>
			</tr>
		</#list>
		<#list selectedShoes as shoe>
        	<tr>
				<td data-title="Name" style="border-bottom: 1px solid #ddd;">
     		 		${shoe.name}
				</td>
				<td data-title="Detail" style="border-bottom: 1px solid #ddd;">
      				<small>
            			Size: ${shoe.size}<br>
          			</small>
				</td>
				<td data-title="Total" style="border-bottom: 1px solid #ddd;">
			 		$${shoe.price} x ${shoe.quantity} = $${calculateTotalForItem(shoe.price, shoe.quantity)}
				</td>
			</tr>
		</#list>
		<#list selectedApparel as apparelItem>
        	<tr>
				<td data-title="Name" style="border-bottom: 1px solid #ddd;">
     				${apparelItem.name}
				</td>
				<td data-title="Detail" style="border-bottom: 1px solid #ddd;">
     				<small>
            			Size: ${apparelItem.size}<br>
            			Color: ${apparelItem.color}<br>
          			</small>
				</td>
				<td data-title="Total" style="border-bottom: 1px solid #ddd;">
			 		$${apparelItem.price} x ${apparelItem.quantity} = $${calculateTotalForItem(apparelItem.price, apparelItem.quantity)}
				</td>
			</tr>
		</#list>
		<#list selectedItems as item>
        	<tr>
				<td data-title="Name" style="border-bottom: 1px solid #ddd;">
     				${item.name}
				</td>
				<td data-title="Detail" style="border-bottom: 1px solid #ddd;">
				</td>
				<td data-title="Total" style="border-bottom: 1px solid #ddd;">
					$${item.price} x ${item.quantity} = $${calculateTotalForItem(item.price, item.quantity)}
				</td>
			</tr>
		</#list>
		<tr>
			<td data-title="Name" style="border-bottom: 1px solid #ddd;"></td>
			<td data-title="Detail" style="border-bottom: 1px solid #ddd;">Subtotal</td>
			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$${subtotal}</td>
		</tr>
    	<tr>
			<td data-title="Name" style="border-bottom: 1px solid #ddd;"></td>
			<td data-title="Detail" style="border-bottom: 1px solid #ddd;">Tax</td>
			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$0</td>
		</tr>
    	<tr>
    		<td data-title="Name" style="border-bottom: 1px solid #ddd;"></td>
			<td data-title="Detail" style="border-bottom: 1px solid #ddd;">Shipping</td>
    		<#if subtotal?number == 0.00>
    			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$0</td>
    		<#elseif subtotal?number gte 50.00>
    			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$0</td>
			<#else>
  				<td data-title="Total" style="border-bottom: 1px solid #ddd;">$5.75</td>
  			</#if>
		</tr>
    	<tr>
			<td data-title="Name" style="border-bottom: 1px solid #ddd;"></td>
			<td data-title="Detail" style="border-bottom: 1px solid #ddd;">Grand Total</td>
			<td data-title="Total" style="border-bottom: 1px solid #ddd;">$${amount}</td>
		</tr>
	</tbody>
</table>


    
        
</body>
</html>