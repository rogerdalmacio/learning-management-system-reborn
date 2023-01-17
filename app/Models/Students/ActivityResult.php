<?php

namespace App\Models\Students;

use App\Models\Users\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityResult extends Model
{
    use HasFactory;

    public function student(){
        return $this->belongsTo(Student::class);    
    }
}
