<?php

namespace App\Models\CoreFunctions;

use App\Models\Users\Admin;
use App\Models\Users\CourseDeveloper;
use App\Models\Users\CourseManager;
use App\Models\Users\Student;
use App\Models\Users\SuperAdmin;
use App\Models\Users\Teacher;
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

    public function Student() {
        return $this->belongsTo(Student::class, 'user_id', 'id');
    }

    public function Teacher() {
        return $this->belongsTo(Teacher::class, 'user_id', 'id');
    }

    public function CourseDeveloper() {
        return $this->belongsTo(CourseDeveloper::class, 'user_id', 'id');
    }

    public function CourseManager() {
        return $this->belongsTo(CourseManager::class, 'user_id', 'id');
    }

    public function Admin() {
        return $this->belongsTo(Admin::class, 'user_id', 'id');
    }

    public function SuperAdmin() {
        return $this->belongsTo(SuperAdmin::class, 'user_id', 'id');
    }

}
