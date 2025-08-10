<?php

namespace App\Livewire;

use App\Models\Directory;
use Livewire\Component;

class Home extends Component
{
    public Directory $current;

    public array $contents = [];

    public string $command = '';

    public function mount()
    {
        $this->current = Directory::root()->first();
        $this->contents = $this->current->contents;
    }

    public function render()
    {
        return view('livewire.home');
    }

    public function executeCommand() {}
}
