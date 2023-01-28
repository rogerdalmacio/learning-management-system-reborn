<?php

namespace App\Models\CoreFunctions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_type',
        'activity_log'
    ];

    
}
