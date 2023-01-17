<?php

namespace Database\Factories\Modules;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Modules\Courses>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $subject = fake()->randomElement(array(
            'Mathematics',
            'Science',
            'English',
            'Computer Science',
            'Physical Education',
        ));

        $department = fake()->randomElement(array(
            'CCS',
            'CRIM',
            'EDUC',
            'Business'
        ));

        return [
            'course' => $subject,
            'course_code' => $subject.'00',
            'department' => $department,
            'approval' => fake()->randomElement(array(1,0)) 
        ];
    }
}
