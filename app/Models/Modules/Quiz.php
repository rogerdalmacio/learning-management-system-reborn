<?php

namespace App\Models\Modules;

use App\Models\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'quiz_info',
        'preliminaries',
        'quiz_type',
    ];

    public function module(){
        return $this->belongsTo(Module::class);
    }
}
