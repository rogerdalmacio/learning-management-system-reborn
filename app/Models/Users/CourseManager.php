<?php

namespace App\Models\Users;

use Laravel\Sanctum\HasApiTokens;
use App\Models\CoreFunctions\Logs;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseManager extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = 'lms_course_managers';

    protected $guard = 'CourseManager';

    protected $fillable = [
        'first_name',
        'last_name',
        'department',
        'email',
        'password',
        'is_logged_in',
        'password_updated',
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

    public function logs() {
        return $this->hasMany(Logs::class);
    }

}
