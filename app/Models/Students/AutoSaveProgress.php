<?php

namespace App\Models\Students;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoSaveProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'quiz_result_id',
        'quiz_id',
        'answers',
        'logs',
        'snapshot',
        'start_time',
        'end_time',
    ];
    
}
