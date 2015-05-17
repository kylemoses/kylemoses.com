<?php
if( isset($_POST['contactFormSubmitted']) ){ 
	
  //sumbission data
  $date = date('d/m/Y');
  $time = date('H:i:s');    

  //form data
  $name = $_POST['name'];
  $organization = $_POST['ogranization'];
  $email = $_POST['email'];  
  $phone = $_POST['phone'];  
  $message = $_POST['message'];  

//send email 
    $headers = "From: www.mosesstudios.com" . "\r\n" ;
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    $emailbody = "<p>You have received a new message from the contact form on www.mosesstudios.com.</p>
                  <p>{$name} </p>
                  <p>{$organization} </p> 
                  <p>{$email} </p>
                  <p>{$phone} </p>

				  <p>Message: {$message} </p>
				  <p></p>
                  <p>This message was sent on {$date} at {$time}</p>
				  <p></p> ";
    mail("moses.kyle@gmail.com","New Enquiry",$emailbody,$headers);
	
	echo 'Thank you for your Email. I will get in touch with you very soon.';

}  

     
?>