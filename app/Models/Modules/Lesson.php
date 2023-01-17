<?php

namespace App\Models\Modules;

use App\Models\Modules\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'preliminaries',
        'title',
        'body',
        'embed_links',
    ];
    
    public function module(){
        return $this->belongsTo(Module::class);
    }
}
