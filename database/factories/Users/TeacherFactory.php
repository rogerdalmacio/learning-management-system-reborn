<?php

namespace Database\Factories\Users;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'departments' =>fake()->randomElement(array(
                'CCS',
                'CRIM',
                'EDUC',
                'Business'
            )),
            'year_and_sections' => '0101',
            'subjects' => fake()->randomElement(array(
                'Mathematics',
                'Science',
                'English',
                'Computer Science',
                'Physical Education',
            )),
        ];
    }
}
