<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $fillable = ['nombreYApellido','email','dni','fechaDeNacimiento','sueldo','area_trabajo_id'];
   
    public function areaTrabajo()
    {
        return $this->belongsTo(AreaTrabajo::class);
    }

}
