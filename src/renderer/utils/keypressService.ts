interface IKeymap {
  [rawKeyCode: number]: {
    id: string
    name: string
  }
}

const keymap: IKeymap = {
  8: {
    id: 'Undo',
    name: 'Undo'
  },
  9: {
    id: 'Tab',
    name: 'Tab'
  },
  13: {
    id: 'Enter',
    name: 'Enter'
  },
  19: {
    id: 'Pause',
    name: 'Pause'
  },
  20: {
    id: 'CapsLock',
    name: 'Caps Lock'
  },
  27: {
    id: 'Escape',
    name: 'Escape'
  },
  33: {
    id: 'PageUp',
    name: 'Page Up'
  },
  34: {
    id: 'PageDown',
    name: 'Page Down'
  },
  35: {
    id: 'End',
    name: 'End'
  },
  36: {
    id: 'Home',
    name: 'Home'
  },
  37: {
    id: 'ArrowLeft',
    name: 'Left'
  },
  38: {
    id: 'ArrowUp',
    name: 'Up'
  },
  39: {
    id: 'ArrowRight',
    name: 'Right'
  },
  40: {
    id: 'ArrowDown',
    name: 'Down'
  },
  44: {
    id: 'PrintScreen',
    name: 'Print Screen'
  },
  45: {
    id: 'Insert',
    name: 'Insert'
  },
  46: {
    id: 'Delete',
    name: 'Delete'
  },
  48: {
    id: 'Digit0',
    name: '0'
  },
  49: {
    id: 'Digit1',
    name: '1'
  },
  50: {
    id: 'Digit2',
    name: '2'
  },
  51: {
    id: 'Digit3',
    name: '3'
  },
  52: {
    id: 'Digit4',
    name: '4'
  },
  53: {
    id: 'Digit5',
    name: '5'
  },
  54: {
    id: 'Digit6',
    name: '6'
  },
  55: {
    id: 'Digit7',
    name: '7'
  },
  56: {
    id: 'Digit8',
    name: '8'
  },
  57: {
    id: 'Digit9',
    name: '9'
  },
  65: {
    id: 'KeyA',
    name: 'A'
  },
  66: {
    id: 'KeyB',
    name: 'B'
  },
  67: {
    id: 'KeyC',
    name: 'C'
  },
  68: {
    id: 'KeyD',
    name: 'D'
  },
  69: {
    id: 'KeyE',
    name: 'E'
  },
  70: {
    id: 'KeyF',
    name: 'F'
  },
  71: {
    id: 'KeyG',
    name: 'G'
  },
  72: {
    id: 'KeyH',
    name: 'H'
  },
  73: {
    id: 'KeyI',
    name: 'I'
  },
  74: {
    id: 'KeyJ',
    name: 'J'
  },
  75: {
    id: 'KeyK',
    name: 'K'
  },
  76: {
    id: 'KeyL',
    name: 'L'
  },
  77: {
    id: 'KeyM',
    name: 'M'
  },
  78: {
    id: 'KeyN',
    name: 'N'
  },
  79: {
    id: 'KeyO',
    name: 'O'
  },
  80: {
    id: 'KeyP',
    name: 'P'
  },
  81: {
    id: 'KeyQ',
    name: 'Q'
  },
  82: {
    id: 'KeyR',
    name: 'R'
  },
  83: {
    id: 'KeyS',
    name: 'S'
  },
  84: {
    id: 'KeyT',
    name: 'T'
  },
  85: {
    id: 'KeyU',
    name: 'U'
  },
  86: {
    id: 'KeyV',
    name: 'V'
  },
  87: {
    id: 'KeyW',
    name: 'W'
  },
  88: {
    id: 'KeyX',
    name: 'X'
  },
  89: {
    id: 'KeyY',
    name: 'Y'
  },
  90: {
    id: 'KeyZ',
    name: 'Z'
  },
  91: {
    id: 'MetaLeft',
    name: 'Left Windows Key'
  },
  92: {
    id: 'MetaRight',
    name: 'Right Windows Key'
  },
  93: {
    id: 'ContextMenu',
    name: 'Context Menu'
  },
  96: {
    id: 'Numpad0',
    name: 'Numpad 0'
  },
  97: {
    id: 'Numpad1',
    name: 'Numpad 1'
  },
  98: {
    id: 'Numpad2',
    name: 'Numpad 2'
  },
  99: {
    id: 'Numpad3',
    name: 'Numpad 3'
  },
  100: {
    id: 'Numpad4',
    name: 'Numpad 4'
  },
  101: {
    id: 'Numpad5',
    name: 'Numpad 5'
  },
  102: {
    id: 'Numpad6',
    name: 'Numpad 6'
  },
  103: {
    id: 'Numpad7',
    name: 'Numpad 7'
  },
  104: {
    id: 'Numpad8',
    name: 'Numpad 8'
  },
  105: {
    id: 'Numpad9',
    name: 'Numpad 9'
  },
  106: {
    id: 'NumpadMultiply',
    name: 'Numpad *'
  },
  107: {
    id: 'NumpadAdd',
    name: 'Numpad +'
  },
  109: {
    id: 'NumpadSubtract',
    name: 'Numpad -'
  },
  110: {
    id: 'NumpadDecimal',
    name: 'Numpad .'
  },
  111: {
    id: 'NumpadDivide',
    name: 'Numpad /'
  },
  112: {
    id: 'F1',
    name: 'F1'
  },
  113: {
    id: 'F2',
    name: 'F2'
  },
  114: {
    id: 'F3',
    name: 'F3'
  },
  115: {
    id: 'F4',
    name: 'F4'
  },
  116: {
    id: 'F5',
    name: 'F5'
  },
  117: {
    id: 'F6',
    name: 'F6'
  },
  118: {
    id: 'F7',
    name: 'F7'
  },
  119: {
    id: 'F8',
    name: 'F8'
  },
  120: {
    id: 'F9',
    name: 'F9'
  },
  121: {
    id: 'F10',
    name: 'F10'
  },
  122: {
    id: 'F11',
    name: 'F11'
  },
  123: {
    id: 'F12',
    name: 'F12'
  },
  124: {
    id: 'F13',
    name: 'F13'
  },
  125: {
    id: 'F14',
    name: 'F14'
  },
  126: {
    id: 'F15',
    name: 'F15'
  },
  127: {
    id: 'F16',
    name: 'F16'
  },
  128: {
    id: 'F17',
    name: 'F17'
  },
  129: {
    id: 'F18',
    name: 'F18'
  },
  130: {
    id: 'F19',
    name: 'F19'
  },
  131: {
    id: 'F20',
    name: 'F20'
  },
  132: {
    id: 'F21',
    name: 'F21'
  },
  133: {
    id: 'F22',
    name: 'F22'
  },
  134: {
    id: 'F23',
    name: 'F23'
  },
  135: {
    id: 'F24',
    name: 'F24'
  },
  144: {
    id: 'NumLock',
    name: 'Num Lock'
  },
  145: {
    id: 'ScrollLock',
    name: 'Scroll Lock'
  },
  160: {
    id: 'ShiftLeft',
    name: 'Left Shift'
  },
  161: {
    id: 'ShiftRight',
    name: 'Right Shift'
  },
  162: {
    id: 'ControlLeft',
    name: 'Left Control'
  },
  163: {
    id: 'ControlRight',
    name: 'Right Control'
  },
  164: {
    id: 'AltLeft',
    name: 'Left Alt'
  },
  165: {
    id: 'AltRight',
    name: 'Right Alt'
  },
  173: {
    id: 'AudioVolumeMute',
    name: 'Mute'
  },
  176: {
    id: 'MediaTrackNext',
    name: 'Media Next Track'
  },
  177: {
    id: 'MediaTrackPrevious',
    name: 'Media Previous Track'
  },
  179: {
    id: 'MediaPlayPause',
    name: 'Media Play/Pause'
  },
  186: {
    id: 'BracketRight',
    name: ']'
  },
  187: {
    id: 'Minus',
    name: 'Minus'
  },
  188: {
    id: 'Comma',
    name: ','
  },
  189: {
    id: 'Slash',
    name: '/'
  },
  190: {
    id: 'Period',
    name: '.'
  },
  191: {
    id: 'Backslash',
    name: '\\'
  },
  192: {
    id: 'Semicolon',
    name: ';'
  },
  219: {
    id: 'Equal',
    name: '='
  },
  220: {
    id: 'Backquote',
    name: '`'
  },
  221: {
    id: 'BracketLeft',
    name: '['
  },
  222: {
    id: 'Quote',
    name: '\''
  },
  226: {
    id: 'IntlBackslash',
    name: '\\'
  }
}

export default class KeypressService {
  private pressedKeys: string[] = []
  private selectedKeysArray: string[] = []

  get selectedKeys (): string {
    return this.selectedKeysArray.join('+')
  }

  keydown (key: string): void {
    if (this.pressedKeys.includes(key)) return
    // Remove keys that have been let go (from keyup)
    this.selectedKeysArray = this.selectedKeysArray.filter(selectedKey => this.pressedKeys.includes(selectedKey))

    this.pressedKeys.push(key)
    this.selectedKeysArray.push(key)
  }
  keyup (key: string): void {
    this.pressedKeys = this.pressedKeys.filter(pressedKey => pressedKey !== key)
  }

  reset (): void {
    this.pressedKeys = []
    this.selectedKeysArray = []
  }
}
