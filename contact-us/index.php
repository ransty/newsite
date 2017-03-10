<?php
	if (isset($_POST["submit"])) {
		$keano = "LearnPassDrive";
		$name = $_POST['name'];
		$email = $_POST['email'];
        $suburb = $_POST['suburb'];
		$phone = $_POST['phone'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$to = 'ransty.jr@gmail.com'; 
		$subject = $name . ' has an enquiry';
		$headers = 'From:  ' . $keano . '<info@learnpassdrive.com.au>' . "\r\n" .
    'Reply-To: ' .$email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();		
		$body ="From: $name\n Suburb: $suburb\n E-Mail: $email\n Phone Number: $phone\n Message:\n $message \n \n *** This is an automatically generated email, pressing reply will contact the customer ***";
        
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
		//Check if simple anti-bot test is correct
		if ($human !== 5) {
			$errHuman = 'Your anti-spam is incorrect';
		}
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
	if (mail ($to, $subject, $body, $headers)) {
		$result='<div class="alert alert-success text-center">Thank You! I will be in touch as soon as possible.</div>';
	} else {
		$result='<div class="alert alert-danger text-center">Sorry there was an error sending your message. Please try again later.</div>';
	}
}
	}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    
     <!-- Meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="School of Driving">
    <meta name="author" content="Keano Porcaro">
    <meta name="keywords" content="driving school, driving, school, adelaide, driving lessons, lessons, how to pass your driving test, driving test, driving instructor, welland driving schools, port adelaide, fullham" />
    
    <title>Learn Pass Drive - School of Driving</title>
        
    <link rel="shortcut icon" type="image/x-icon" href="data:image/jpeg;base64,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">
    
    <!-- Bootstrap Core CSS -->
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- Theme CSS -->
    <link href="../css/agency.min.css" rel="stylesheet">
    
    <!-- Google Analytics -->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-87125407-1', 'auto');
        ga('send', 'pageview');

    </script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <style>
        ul {
            list-style-type: none;
        }
        
        .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #000000;
            min-width: 300px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            padding: 12px 16px;
            z-index: 1;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }
        
        #gform {
            margin-left: auto;
            margin-right: auto;
        }
    </style>

</head>

<body>
    <!-- Navigation -->
    <nav id="mainNav" style="background:#000000;" class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a href="../index.html"><img class="page-scroll" width="100" height="100" src='../img/logo.png'></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../index.html#about">About</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../vorttest.html#vort">VORT TEST &amp; LICENSE SYSTEM</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../pricing.html#pricing">Pricing &amp; Packages</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../index.html#testimonials">Testimonials</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="booking.php#booking">Booking</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>

    <!-- Header -->
    <header style="background-image:url(../img/header-bg.jpg);">
        <div class="container">
            <div class="intro-text">
                <h2 id="intro" style="color:#fed136;" class="intro-lead-in">GET IN TOUCH WITH US</h2>
                <!-- <a href="#services" class="page-scroll btn btn-xl">Tell Me More</a> -->
            </div>
        </div>
    </header>
	
  	<div class="container">
  		<div class="row">
  			<div class="col-md-6 col-md-offset-3">
                <br>
                <?php echo $result; ?>	
  				<h1 class="page-header text-center">Contact Form</h1>
				<form class="form-horizontal" role="form" method="post" action="index.php">
					<div class="form-group">
						<label for="name" class="col-sm-2 control-label">Name</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="name" name="name" placeholder="First & Last Name" value="<?php echo htmlspecialchars($_POST['name']); ?>">
							<?php echo "<p class='text-danger'>$errName</p>";?>
						</div>
					</div>					
                    			<div class="form-group">
						<label for="suburb" class="col-sm-2 control-label">Suburb</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="suburb" name="suburb" placeholder="i.e Welland" value="<?php echo htmlspecialchars($_POST['suburb']); ?>">
							<?php echo "<p class='text-danger'>$errSuburb</p>";?>
						</div>
					</div>
                    			<div class="form-group">
						<label for="phone" class="col-sm-2 control-label">Phone</label> 
						<div class="col-sm-10">	
							<input type="text" class="form-control" id="phone" name="phone" placeholder="0412345678" value="<?php echo htmlspecialchars($_POST['phone']); ?>">
						</div>
					</div>
					<div class="form-group">
						<label for="email" class="col-sm-2 control-label">Email</label>
						<div class="col-sm-10">	
							<input type="text" class="form-control" id="email" name="email" placeholder="you@example.com" value="<?php echo htmlspecialchars($_POST['email']); ?>">
							<?php echo "<p class='text-danger'>$errEmail</p>";?>
						</div>
					</div>
					<div class="form-group">
						<label for="message" class="col-sm-2 control-label">Message</label>
						<div class="col-sm-10">
							<textarea class="form-control" rows="4" name="message"><?php echo htmlspecialchars($_POST['message']);?></textarea>
							<?php echo "<p class='text-danger'>$errMessage</p>";?>
						</div>
					</div>
					<div class="form-group">
						<label for="human" class="col-sm-2 control-label">2 + 3 = ?</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="human" name="human" placeholder="Your Answer">
							<?php echo "<p class='text-danger'>$errHuman</p>";?>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-10 col-sm-offset-2">
							<input id="submit" name="submit" type="submit" value="Send" class="btn btn-primary">
						</div>
					</div>
				</form> 
			</div>
		</div>
	</div>   
      
<script src="../vendor/jquery/jquery.min.js"></script>
<script type="text/javascript">var submitted=false;</script>
<script type="text/javascript">
$('#gform').on('submit', function(e) {
  $('#gform').append('Thank you for making contact with us, we will be in touch soon!');
  });
</script>

    <!-- jQuery -->
    <script src="/vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

    <!-- Theme JavaScript -->
    <script src="/js/agency.min.js"></script>

</body>
</html>
