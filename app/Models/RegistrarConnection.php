<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrarConnection extends Model
{
    use HasFactory;

    protected $table = 'registrar_requestdata';

    protected $fillable = [
        'No',
        'Request',
        'Department',
        'Status',
        'Request_date',
    ];
}
