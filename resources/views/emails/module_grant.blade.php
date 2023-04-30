<!DOCTYPE html>
<html>
<head>
@if (!$module_week % 6 == 0)
  <title>Module Grant</title>
@else
  <title>Hooray, Exam week!</title>
@endif
</head>
<body>
<h1>Hello {{ $user->first_name }} {{ $user->last_name }}</h1>
<h3>Week {{ $module_week }}</h3>
<p>is now open!</p>
<a href="https://lms.bcpsms.com">Answer now</a>
@if (!$module_week % 6 == 0)
  <p>Take it easy, you have an estimate of 1 week to finish all your modules. Goodluck !</p>
@else
  <p>Take it easy, you have an estimate of 1 week to finish your exams. Goodluck !</p>
  <p>if you already paid your exam please wait for an email for your examination grant. Thank you</p>
@endif
</body>
</html>