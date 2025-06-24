import React, { useState, useEffect, useRef } from 'react';

const MiniTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Terminal v1.0.0' },
    { type: 'system', text: 'Type "help" for available commands' },
    { type: 'prompt', text: '' }
  ]);
  const [currentPath] = useState('~/buwaneka');
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const commands = {
    help: () => [
      { type: 'output', text: 'Available commands:' },
      { type: 'output', text: '  download - Download CV.pdf' },
      { type: 'output', text: '  clear    - Clear terminal' },
      { type: 'output', text: '  about    - About this terminal' },
      { type: 'output', text: '  ls       - List files' }
    ],
    download: () => {
      //pdf
      const link = document.createElement('a');
      link.href = '/Buwaneka_Senarathne_cv.pdf';
      link.download = 'CV.pdf';
      link.click();

      return [
        { type: 'output', text: 'Downloading CV.pdf...' },
        { type: 'success', text: '✓ Download initiated successfully!' }
      ];
    },
    clear: () => {
      setOutput([{ type: 'prompt', text: '' }]);
      return [];
    },
    about: () => [
      { type: 'output', text: 'Mini Portfolio Terminal' },
      { type: 'output', text: 'Built with React for interactive portfolio experience' },
      { type: 'output', text: 'Author: Buwaneka Vishwajith' }
    ],
    ls: () => [
      { type: 'output', text: 'Buwaneka Vishwajith/' },
      { type: 'output', text: '├── How I Got Here' },
      { type: 'output', text: '├── projects/' },
      { type: 'output', text: '├── skills.json' },
      { type: 'output', text: '└── contact.txt' }
    ]
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return [];
    
    if (commands[trimmedCmd]) {
      return commands[trimmedCmd]();
    } else {
      return [
        { type: 'error', text: `Command not found: ${trimmedCmd}` },
        { type: 'output', text: 'Type "help" for available commands' }
      ];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newOutput = [
      ...output.slice(0, -1), // Remove the empty prompt
      { type: 'command', text: `${currentPath}$ ${input}` },
      ...executeCommand(input),
      { type: 'prompt', text: '' }
    ];
    
    setOutput(newOutput);
    setInput('');
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'system': return 'text-blue-400';
      case 'command': return 'text-white';
      case 'output': return 'text-gray-300';
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'prompt': return 'text-white';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-2 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-400 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-xs">terminal</div>
        <div className="w-6 sm:w-12"></div>
      </div>

      {/* Terminal Body */}
<div 
  className="bg-black p-2 sm:p-4 h-64 sm:h-72 md:h-80 overflow-y-auto cursor-text terminal-scrollbar"
  onClick={focusInput}
  ref={outputRef}
>
        {output.map((line, index) => (
          <div key={index} className={`${getTextColor(line.type)} leading-relaxed break-words`}>
            {line.type === 'prompt' && index === output.length - 1 ? (
              <div className="flex items-center flex-wrap">
                <span className="text-green-400 whitespace-nowrap">{currentPath}$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  className="bg-transparent text-white outline-none flex-1 ml-2 min-w-0"
                  autoFocus
                  spellCheck="false"
                />
                <span className="animate-pulse text-white">_</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{line.text}</div>
            )}
          </div>
        ))}
      </div>

      {/* Terminal Footer */}
      <div className="bg-gray-800 px-2 sm:px-4 py-1 text-xs text-gray-500 flex justify-between">
        <span className="truncate">Type "download" to get CV</span>
      </div>
    </div>
  );
};

export default MiniTerminal;