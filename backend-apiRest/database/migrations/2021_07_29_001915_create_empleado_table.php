<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpleadoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->char('nombreYApellido',20);
            $table->string('email')->unique();
            $table->integer('dni')->unique(); 
            $table->date('fechaDeNacimiento');
            $table->integer('sueldo');
            $table->unsignedBigInteger('area_trabajo_id');
            $table->timestamps();
            
            $table->foreign('area_trabajo_id')->references('id')->on('areas_trabajos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empleados');
    }
}
