<?php

namespace App\Terminal;

class CommandDispatcher
{
    private CommandRegistry $registry;

    public function __construct()
    {
        $this->registry = new CommandRegistry;
    }

    public function run(string $command, array $args = [])
    {
        $command = $this->registry->get($command);
        if ($command instanceof CommandInterface) {
            return $command->execute($args);
        }

        return 'Command not found';

    }
}
