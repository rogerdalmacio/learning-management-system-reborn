<?php

namespace App\Models\CourseManager;

use App\Models\Users\CourseDeveloper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoList extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_developer_id',
        'title',
        'message',
        'status',
    ];

    public function coursedeveloper(){
        return $this->belongsTo(CourseDeveloper::class);
    }
}
