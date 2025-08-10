<?php

use App\Terminal\CommandDispatcher;

beforeEach(function () {
    $this->command = new CommandDispatcher;
});

it('handles invalid commands gracefully', function () {
    $response = $this->command->run('invalidCommand');
    expect($response)->toBe('Command not found');
});
