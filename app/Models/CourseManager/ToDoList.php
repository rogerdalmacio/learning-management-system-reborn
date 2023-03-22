<?php

namespace App\Models\CourseManager;

use App\Models\Users\CourseDeveloper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoList extends Model
{
    use HasFactory;

    protected $table = 'lms_to_do_lists';

    protected $fillable = [
        'course_developer_id',
        'course_id',
        'title',
        'message',
        'status',
    ];

    public function coursedeveloper(){
        return $this->belongsTo(CourseDeveloper::class);
    }
    
}
