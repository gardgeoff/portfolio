<?php

use App\Livewire\Home;
use App\Models\Directory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;

uses(RefreshDatabase::class);

test('can access home page component', function () {
    Livewire::test(Home::class)
        ->assertStatus(200);
});

it('loads root directory', function () {
    $root = Directory::factory()->root()->create();
    Livewire::test(Home::class)
        ->asserSee($root->name);

});

it('can list directories', function() {
    $directory = Directory::factory()->root()->create();
    Livewire::test(Home::class)
        ->assertSee($directory->name)
        ->call();
})
