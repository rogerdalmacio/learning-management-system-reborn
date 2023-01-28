<?php

namespace App\Models\Users;

use App\Models\CoreFunctions\Announcement;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */

    protected $guard = 'Admin';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
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

    public function usertype() {

        return 'Admin';

    }

    public function getAuthPassword() {

        return $this->password;

    }

    public function announcement() {

        return $this->hasMany(Announcement::class);
        
    }


}
