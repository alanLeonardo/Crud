<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaTrabajo;
use \Datetime;

class AreaTrabajoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    protected $model = AreaTrabajo::class; 


    public function run()
    {
        $areaTrabajo1 = new AreaTrabajo();
        $areaTrabajo1->nombre = 'Dirección General';
        $areaTrabajo1->updated_at = new DateTime();
        $areaTrabajo1->created_at = new DateTime('today');
        $areaTrabajo1->save();

        $areaTrabajo2 = new AreaTrabajo();
        $areaTrabajo2->nombre = 'Administración y Recursos Humanos';
        $areaTrabajo2->updated_at = new DateTime();
        $areaTrabajo2->created_at = new DateTime('today');
        $areaTrabajo2->save();

        $areaTrabajo3 = new AreaTrabajo();
        $areaTrabajo3->nombre = 'Producción';
        $areaTrabajo3->updated_at = new DateTime();
        $areaTrabajo3->created_at = new DateTime('today');
        $areaTrabajo3->save();

        $areaTrabajo4 = new AreaTrabajo();
        $areaTrabajo4->nombre = 'Finanzas y Contabilidad';
        $areaTrabajo4->updated_at = new DateTime();
        $areaTrabajo4->created_at = new DateTime('today');
        $areaTrabajo4->save();

        $areaTrabajo5 = new AreaTrabajo();    
        $areaTrabajo5->nombre = 'Marketing';
        $areaTrabajo5->updated_at = new DateTime();
        $areaTrabajo5->created_at = new DateTime('today');
        $areaTrabajo5->save();

        $areaTrabajo6 = new AreaTrabajo();
        $areaTrabajo6->nombre = 'Informática';
        $areaTrabajo6->updated_at = new DateTime();
        $areaTrabajo6->created_at = new DateTime('today');   
        $areaTrabajo6->save();
    }
}
