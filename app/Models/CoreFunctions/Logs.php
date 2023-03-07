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

    public function student() {
        return $this->belongsTo(Student::class);
    }

    public function teacher() {
        return $this->belongsTo(Teacher::class);
    }

    public function coursedeveloper() {
        return $this->belongsTo(CourseDeveloper::class);
    }

    public function coursemanager() {
        return $this->belongsTo(CourseManager::class);
    }

    public function admin() {
        return $this->belongsTo(Admin::class);
    }

    public function superadmin() {
        return $this->belongsTo(SuperAdmin::class);
    }

}
