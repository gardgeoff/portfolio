<?php

namespace App\Terminal;

interface CommandInterface
{
    /**
     * Execute the command with the given arguments.
     *
     * @return mixed
     */
    public function execute(array $args = []);

    /**
     * Get the name of the command.
     */
    public function getName(): string;

    /**
     * Get a description of the command.
     */
    public function getDescription(): string;
}
