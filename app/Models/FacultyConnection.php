<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacultyConnection extends Model
{
    use HasFactory;

    protected $table = 'lms_faculty_connections';

    protected $fillable = [
        'status',
        'file'
    ];
}
