<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmpleadoRequest extends FormRequest
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
            'nombreYApellido'    => 'required|string|min:1|max:30',
            'email'              => 'required|email|unique:empleados',
            'dni'                => 'required|min:8|max:8',
            'fechaDeNacimiento'  => 'required|date',
            'sueldo'             => 'required|min:1',
            'area_trabajo_id'    => 'required|min:1'
        ];
    }
}
