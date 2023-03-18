<?php

namespace App\Models\Users;

use Laravel\Sanctum\HasApiTokens;
use App\Models\CoreFunctions\Logs;
use App\Models\CoreFunctions\ToDoList;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseDeveloper extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */


    protected $guard = 'CourseDeveloper';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'department',
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

    public function usertype()
    {
        return 'CourseDeveloper';
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function logs() {
        return $this->hasMany(Logs::class);
    }

    public function ToDolist()
    {
        return $this->hasMany(ToDoList::class);
    }
}
