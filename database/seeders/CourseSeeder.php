<?php


namespace Database\Seeders;


use App\Models\Modules\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Course::factory()->count(10)->create();
    }
}
