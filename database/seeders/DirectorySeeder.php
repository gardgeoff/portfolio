<?php

namespace Database\Seeders;

use App\Models\Directory;
use Illuminate\Database\Seeder;

class DirectorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Directory::factory()
            ->root()
            ->has(\App\Models\Directory::factory()->count(5), 'directories')
            ->has(\App\Models\File::factory()->count(10), 'files')
            ->create();
    }
}
