<?php

namespace App\Models\Modules;

use App\Models\CourseManager\ContentValidation;
use App\Models\CourseRating;
use App\Models\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $table = 'lms_courses';

    protected $fillable = [
        'course',
        'course_code',
        'department',
        'approval'
    ];


    public function module(){
        return $this->hasMany(Module::class);
    }

    public function contentvalidation(){
        return $this->hasManyThrough(
            ContentValidation::class, 
            Module::class,
            'lms_course_id',
            'lms_module_id',
            'id',
            'id'
        );
    }

    public function lesson(){
        return $this->hasManyThrough(
            Lesson::class, 
            Module::class,
            'lms_course_id',
            'lms_module_id',
            'id',
            'id'
        );
    }

    public function activity(){
        return $this->hasManyThrough(
            Activity::class, 
            Module::class,
            'lms_course_id',
            'lms_module_id',
            'id',
            'id'
        );
    }

    public function quiz(){
        return $this->hasManyThrough(
            Quiz::class, 
            Module::class,
            'lms_course_id',
            'lms_module_id',
            'id',
            'id'
        );
    }

    public function rating()
    {
        return $this->hasOne(CourseRating::class);
    }

    public function syllabus()
    {
        return $this->hasOne(CourseSyllabus::class);
    }
}
