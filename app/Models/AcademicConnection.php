<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicConnection extends Model
{
    use HasFactory;

    protected $table = 'ams_cmo';

    protected $fillable = [
        'No',
        'Request',
        'Department',
        'Status',
        'Request_date',
        'File'
    ];
}
