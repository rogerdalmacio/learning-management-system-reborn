<?php

namespace App\Models\Students;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoSaveProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'quiz_id',
        'module_id',
        'preliminaries',
        'quiz_type',
        'answers',
        'logs',
        'snapshot',
        'start_time',
        'end_time',
    ];
    
}
