<?php

namespace App\Models\CourseManager;

use App\Models\Modules\Module;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentValidation extends Model
{
    use HasFactory;

    protected $table = 'lms_content_validations';

    protected $fillable = [
        'module_id',
        'status',
        'comments',
        'deadline',
        'submitted' 
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }


}
