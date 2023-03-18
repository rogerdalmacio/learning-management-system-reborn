<?php

namespace App\Models\Users;

use Laravel\Sanctum\HasApiTokens;
use App\Models\CoreFunctions\Logs;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SuperAdmin extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $guard = 'SuperAdmin';

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

   protected $casts = [
       'email_verified_at' => 'datetime',
   ];

    public function usertype(){
        return 'SuperAdmin';
    }

    public function logs() {
        return $this->hasMany(Logs::class);
    }

   public function getAuthPassword()
   {
       return $this->password;
   }
}

