<?php

use App\Http\Controllers\Api\Empleados2Controller;
use App\Http\Controllers\Api\EmpleadosController;
use App\Http\Controllers\Api\AreaTrabajoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::group(['as' => 'api.'], function() {
  //  Orion::resource('empleados', EmpleadosController::class);
//});


Route::apiResource('empleados', Empleados2Controller::class);

Route::apiResource('areas_trabajos', AreaTrabajoController::class);






