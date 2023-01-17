<?php

namespace App\Models\CoreFunctions;

use App\Models\Users\Admin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'status',
        'embed_link'
    ];

    public function admin() {

        return $this->belongsTo(Admin::class);

    }
        
}
