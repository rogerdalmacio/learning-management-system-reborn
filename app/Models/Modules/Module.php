<?php

namespace App\Models\Modules;

use App\Models\CourseManager\ContentValidation;
use App\Models\Modules\Quiz;
use App\Models\Modules\Course;
use App\Models\Modules\Lesson;
use App\Models\Modules\Activity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory;

    protected $table = 'lms_modules';

    protected $fillable = [
        'id',
        'course_id',
        'title',
        'week',
        'status',
        'approval',
    ];

    public $incrementing = false;

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function quiz(){
        return $this->hasMany(Quiz::class);
    }
    
    public function activity(){
        return $this->hasMany(Activity::class);
    }

    public function lesson(){
        return $this->hasMany(Lesson::class);
    }

    public function rating()
    {
        return $this->hasOne(CourseRating::class);
    }

    public function contentValidate()
    {
        return $this->hasOne(ContentValidation::class);
    }
}
