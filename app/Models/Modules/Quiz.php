<?php

namespace App\Models\Modules;

use App\Models\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;

    protected $table = 'lms_quizzes';

    protected $fillable = [
        'module_id',
        'preliminaries',
        'quiz_type',
        'questions',
        'answers',
        'options'
    ];

    public function module(){
        return $this->belongsTo(Module::class);
    }
}
