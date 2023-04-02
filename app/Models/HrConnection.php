<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrConnection extends Model
{
    use HasFactory;

    protected $table = 'hr_request';

    protected $fillable = [
        'No',
        'Request',
        'Department',
        'Status',
        'Request_Date',
        'File'
    ];
}
