<?php

namespace App\Models\CoreFunctions;

use App\Models\Users\Admin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $table = 'lms_announcements';

    protected $fillable = [
        'title',
        'body',
        'status',
        'photo_path',
        'users',
        'tags',
    ];

    public function admin() {

        return $this->belongsTo(Admin::class);

    }
        
}
