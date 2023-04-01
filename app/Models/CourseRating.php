<?php

namespace App\Models;

use App\Models\Modules\Course;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseRating extends Model
{
    use HasFactory;

    protected $table = 'lms_course_ratings';

    protected $fillable = [
        'course_id',
        'comprehensiveness',
        'accuracy',
        'readability',
        'complete',
    ];


    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
