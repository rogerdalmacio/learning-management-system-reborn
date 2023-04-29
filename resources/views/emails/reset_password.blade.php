<!DOCTYPE html>
<html>
<head>
<title>Password reset</title>
</head>
<body>
<h1>Hello {{ $user->first_name }} {{ $user->last_name }}</h1>
<h3>{{ $password }}</h3>
<p>please use this password to log in to your account</p>
<a href="https://lms.bcpsms.com">Log in</a>
<p>Don't forget to change your password once you have logged in</p>
</body>
</html>