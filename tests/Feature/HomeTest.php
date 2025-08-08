<?php

use App\Livewire\Home;
use Livewire\Livewire;

test('can access home page component', function () {
    Livewire::test(Home::class)
        ->assertStatus(200);
});
