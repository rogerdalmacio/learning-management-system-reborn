<?php

namespace App\Models\Students;

use App\Models\Users\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'module_id',
        'preliminaries',
        'quiz_type',
        'attempt',
        'score',
        'logs',
        'snapshot',
        'time_elapsed'
    ];

    public function student(){
        return $this->belongsTo(Student::class);    
    }
}
