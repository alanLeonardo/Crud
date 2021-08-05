<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEmpleadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        
        return [
            'nombreYApellido'    => 'required|string|max:30|regex:/^([a-zA-Z- ñáéíóú]{2,60})$/',
            'email'              => 'required|email|unique:empleados',
            'dni'                => 'required|numeric|digits_between:8,8',
            'fechaDeNacimiento'  => 'required|date|date_format:Y-m-d',
            'sueldo'             => 'required|numeric|min:5000',
            'area_trabajo_id'    => 'required|numeric|exists:areas_trabajos,id'
        ];
    }
}

