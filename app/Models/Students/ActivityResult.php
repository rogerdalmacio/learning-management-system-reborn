<?php

namespace App\Models\Students;

use App\Models\Users\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityResult extends Model
{
    use HasFactory;

    protected $table = 'lms_activity_results';

    protected $fillable = [
        'student_id',
        'activity_id',
        'module_id',
        'activity_type',
        'terms',
        'status',
        'attempt',
        'score',
        'percentage',
    ];

    public function student(){
        return $this->belongsTo(Student::class);    
    }
}
