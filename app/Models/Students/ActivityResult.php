<?php

namespace App\Models\Students;

use App\Models\Users\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'activity_id',
        'module_id',
        'terms',
        'attempt',
        'score'
    ];

    public function student(){
        return $this->belongsTo(Student::class);    
    }
}
