<?php

namespace App\Models\Users;

use App\Models\Students\Grade;
use Laravel\Sanctum\HasApiTokens;
use App\Models\CoreFunctions\Logs;
use App\Models\Students\QuizResult;
use App\Models\Students\ActivityResult;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Model;
use App\Models\CoreFunctions\ExaminationGrant;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $guard = 'Student';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'year_and_section',
        'major',
        'department',
        'program',
        'subjects',
        'is_logged_in',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function usertype(){
        return 'Student';
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function logs() {
        return $this->hasMany(Logs::class);
    }

    public function grade(){
        return $this->hasMany(Grade::class);    
    }

    public function grant(){
        return $this->hasMany(ExaminationGrant::class);    
    }

    public function activityresult(){
        return $this->hasMany(ActivityResult::class);    
    }

    public function quizresult(){
        return $this->hasMany(QuizResult::class);    
    }

}
