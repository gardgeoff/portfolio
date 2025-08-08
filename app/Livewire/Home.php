<?php

namespace App\Livewire;

use Livewire\Component;

class Home extends Component
{
    public function render()
    {
        return view('livewire.home');
    }

    public function add($first, $second): int
    {
        return $first + $second;
    }
}
