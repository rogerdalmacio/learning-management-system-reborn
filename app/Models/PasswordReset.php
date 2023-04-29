<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    protected $table = 'lms_password_resets';

    protected $fillables = [
        'user_type',
        'email',
        'base_password',
        'status'
    ];
}
