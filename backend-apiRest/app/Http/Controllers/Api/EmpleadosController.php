<?php

namespace App\Http\Controllers\Api;

use App\Models\Empleado;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;

class EmpleadosController extends Controller
{
    use DisableAuthorization;

    protected $model = Empleado::class;
}
