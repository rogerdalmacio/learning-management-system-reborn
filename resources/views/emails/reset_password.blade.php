@php
    $url = env('APP_URL') . '/api/reset-password?token=' . $token . '&usertype=' . $usertype;
@endphp
<!DOCTYPE html>
<html>
<head>
<title>Password reset</title>
</head>
<body>
<a href={{ $url }}>Click to reset password</a>
<br>
<p>If you didn't asked to reset your password you can ignore this email.</p>
</body>
</html>