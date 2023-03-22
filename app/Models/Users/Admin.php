<?php

namespace App\Models\Users;

use App\Models\CoreFunctions\Announcement;
use App\Models\CoreFunctions\Logs;
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

    protected $table = 'lms_admins';

    protected $guard = 'Admin';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
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

    public function usertype() {

        return 'Admin';

    }

    public function getAuthPassword() {

        return $this->password;

    }

    public function logs() {
        return $this->hasMany(Logs::class);
    }

    public function announcement() {

        return $this->hasMany(Announcement::class);
        
    }


}
