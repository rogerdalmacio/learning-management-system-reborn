<?php

namespace Database\Seeders;


use App\Models\Users\Admin;
use App\Models\Users\Student;
use App\Models\Users\Teacher;
use Illuminate\Database\Seeder;
use App\Models\Users\CourseDeveloper;
use App\Models\Users\CourseManager;
use App\Models\Users\SuperAdmin;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Student::factory()->count(5)->create();

        Teacher::factory()->count(5)->create();

        CourseDeveloper::factory()->count(1)->create();

        CourseManager::factory()->count(1)->create();

        Admin::factory()->count(1)->create();

        SuperAdmin::factory()->count(1)->create();
        
    }
}
