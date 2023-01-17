<?php

namespace App\Models\Modules;

use App\Models\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'preliminaries',
        'activity_type',
        'title',
        'body',
    ];

    public function module(){
        return $this->belongsTo(Module::class);
    }
}
