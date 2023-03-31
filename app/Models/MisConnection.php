<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MisConnection extends Model
{
    use HasFactory;

    protected $table = 'mis_categorize_inq';

    protected $fillable = [
        'inq_num',
        'inq_type',
        'department',
        'department',
        'date_req',
        'status',
    ];
}
