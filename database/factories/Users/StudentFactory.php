<?php

namespace Database\Factories\Users;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        for($i = 0; $i < 2; $i++) {

            return [
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'email' => fake()->unique()->safeEmail(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'section' => '1',
                'departments' => fake()->randomElement(array(
                    'CCS',
                    'CRIM',
                    'EDUC',
                    'Business'
                )),
                'year_level' => '4',
                'subjects' => ''
            ];
        }
    }
}
