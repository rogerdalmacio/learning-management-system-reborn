<?php

namespace App\Models\Users;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Notifications\Notifiable;
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

   public function getAuthPassword()
   {
       return $this->password;
   }
}

