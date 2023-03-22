<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class LmsPersonalAccessToken extends SanctumPersonalAccessToken
{
    use HasFactory;

    protected $table = 'lms_personal_access_token';
}
