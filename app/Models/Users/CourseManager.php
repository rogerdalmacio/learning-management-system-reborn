<?php

namespace App\Models\Users;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseManager extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $guard = 'CourseManager';

    protected $fillable = [
        'name',
        'department',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function usertype(){
        return 'CourseManager';
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

}
