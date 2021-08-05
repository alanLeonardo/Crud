<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateEmpleadoRequest;
use App\Http\Requests\UpdateEmpleadoRequest;
use App\Models\Empleado;
use Carbon\Carbon;

class Empleados2Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empleados = Empleado::all();

        return response()->json(['data' => $empleados]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateEmpleadoRequest $request)
    {  
        $empleado = new Empleado($request->all());
     
        $empleado->save();

        return response()->json(['data'=>$empleado],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Empleado $empleado)
    {  

        return response()->json(['data'=>$empleado]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmpleadoRequest $request,Empleado $empleado)
    {   
        $empleado->fill($request->all());
        
        $empleado->save();

        return response()->json(['data'=>$empleado]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Empleado $empleado)
    {
        $empleado->delete();  

        return response()->json(['data' => $empleado]);
    }
}
