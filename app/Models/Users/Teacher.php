<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class Teacher extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    
    protected $table = 'teachers';

    protected $guard = 'Teacher';

    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'department',
        'program',
        'year_and_sections',
        'subjects',
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
        return 'Teacher';
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function students() {
       
        $students = Student::whereIn('year_and_section', $this->year_and_section)->get();

        return $students;
    }
}
