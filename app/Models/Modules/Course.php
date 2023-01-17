<?php

namespace App\Models\Modules;

use App\Models\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'course',
        'course_code',
        'departments',
        'approval'
    ];


    public function module(){
        return $this->hasMany(Module::class);
    }

    public function lesson(){
        return $this->hasManyThrough(
            Lesson::class, 
            Module::class,
            'course_id',
            'module_id',
            'id',
            'id'
        );
    }

    public function activity(){
        return $this->hasManyThrough(
            Activity::class, 
            Module::class,
            'course_id',
            'module_id',
            'id',
            'id'
        );
    }

    public function quiz(){
        return $this->hasManyThrough(
            Quiz::class, 
            Module::class,
            'course_id',
            'module_id',
            'id',
            'id'
        );
    }
}
