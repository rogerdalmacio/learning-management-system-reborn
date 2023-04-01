<?php

namespace App\Models\Modules;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseSyllabus extends Model
{
    use HasFactory;

    protected $table = 'lms_course_syllabi';

    protected $fillables = [
        'week1',
        'week2',
        'week3',
        'week4',
        'week5',
        'week6',
        'week7',
        'week8',
        'week9',
        'week10',
        'week11',
        'week12',
        'week13',
        'week14',
        'week15',
        'week16',
        'week17',
        'week18',
        'week19',
        'week20',
        'week21',
        'week22',
        'week23',
        'week24',
    ];
}
