<?php

namespace Database\Factories;

use App\Models\Directory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\WithFaker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Directory>
 */
class DirectoryFactory extends Factory
{
    use WithFaker;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(1, true),
            'parent_id' => Directory::factory(),
        ];
    }

    public function root(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'parent_id' => null,
            ];
        });
    }
}
