<?php

namespace App\Models\Students;

use App\Models\Users\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizResult extends Model
{
    use HasFactory;

    protected $table = 'lms_quiz_results';

    protected $fillable = [
        'student_id',
        'quiz_id',
        'module_id',
        'preliminaries',
        'quiz_type',
        'attempt',
        'score',
        'logs',
        'snapshot',
        'start_time',
        'end_time',
        'time_elapsed',
    ];

    public function student(){
        return $this->belongsTo(Student::class);    
    }
}
