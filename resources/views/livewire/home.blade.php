<div class="bg-black text-green-500 font-mono h-screen flex flex-col">
    <div class="flex-1 p-4 overflow-y-auto" id="terminal-output">
      <p>GefOS</p>
      <p>Type 'help' to get started.</p>
    </div>

    <div class="p-4 bg-black border-t border-green-700">
      <form id="terminal-form" class="flex items-center space-x-2">
        <span class="text-green-500">$</span>
        <input
          type="text"
          id="terminal-input"
          class="flex-1 bg-transparent text-green-500 placeholder-green-700 caret-green-500 focus:outline-none"
          placeholder="Enter command..."
          autocomplete="off"
        />
      </form>
    </div>
</div>
