<?php

namespace App\Models\CoreFunctions;

use App\Models\Users\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
    ];
    

    public function student(){
        return $this->belongsTo(Student::class);    
    }
}
