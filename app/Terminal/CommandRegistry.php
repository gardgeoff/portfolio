<?php

namespace App\Terminal;

class CommandRegistry
{
    protected array $commands = [];

    public function __construct()
    {
        $this->commands = [
        ];
    }

    public function get(string $command): ?string
    {
        return $this->commands[$command] ?? null;
    }
}
