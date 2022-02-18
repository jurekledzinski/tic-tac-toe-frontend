export const logoData = [
  { letter: 'T' },
  { letter: 'I' },
  { letter: 'C' },
  { letter: 'T' },
  { letter: 'A' },
  { letter: 'C' },
  { letter: 'T' },
  { letter: 'O' },
  { letter: 'E' },
];

export const homeBtns = [
  { option: 'Single player', url: '/difficulty' },
  { option: 'Multiplayer', url: '/multiplayer' },
  { option: 'Local multiplayer', url: '/localmultiplayer-start-game' },
];

export const difficultyBtns = [
  { option: 'Easy' },
  { option: 'Medium' },
  { option: 'Hard' },
];

export const botNames = [
  { lvl: 'Easy', bot: 'Tic bot' },
  { lvl: 'Medium', bot: 'Tac bot' },
  { lvl: 'Hard', bot: 'Toe bot' },
];

export const signBtns = [{ option: 'x' }, { option: 'o' }];

export let boxes = Array(9).fill({ value: null, i: null, win: false }, 0, 9);

export const win = [
  [
    { value: '', i: 0, win: false },
    { value: '', i: 1, win: false },
    { value: '', i: 2, win: false },
  ],
  [
    { value: '', i: 3, win: false },
    { value: '', i: 4, win: false },
    { value: '', i: 5, win: false },
  ],
  [
    { value: '', i: 6, win: false },
    { value: '', i: 7, win: false },
    { value: '', i: 8, win: false },
  ],
  [
    { value: '', i: 0, win: false },
    { value: '', i: 3, win: false },
    { value: '', i: 6, win: false },
  ],
  [
    { value: '', i: 1, win: false },
    { value: '', i: 4, win: false },
    { value: '', i: 7, win: false },
  ],
  [
    { value: '', i: 2, win: false },
    { value: '', i: 5, win: false },
    { value: '', i: 8, win: false },
  ],
  [
    { value: '', i: 0, win: false },
    { value: '', i: 4, win: false },
    { value: '', i: 8, win: false },
  ],
  [
    { value: '', i: 2, win: false },
    { value: '', i: 4, win: false },
    { value: '', i: 6, win: false },
  ],
];

// export const sortData = [
//   { value: ['default', 'default'], text: '-- Sort results --' },
//   { value: ['asc', 'namePlayer1'], text: 'Name player 1 A-Z' },
//   { value: ['desc', 'namePlayer1'], text: 'Name player 1 Z-A' },
//   { value: ['asc', 'namePlayer2'], text: 'Name player 2 A-Z' },
//   { value: ['desc', 'namePlayer2'], text: 'Name player 2 Z-A' },
//   { value: ['asc', 'draws'], text: ' Draws up' },
//   { value: ['desc', 'draws'], text: 'Draws down' },
//   { value: ['asc', 'wins1'], text: 'Wins player 1 up' },
//   { value: ['desc', 'wins1'], text: 'Wins player 1 down' },
//   { value: ['asc', 'wins2'], text: 'Wins player 2 up' },
//   { value: ['desc', 'wins2'], text: 'Wins player 2 down' },
// ];

export const sortData = [
  {
    icon: 'fas fa-random',
    id: 'sort0',
    name: 'sort',
    value: ['default', 'default'],
    text: 'Default sort',
  },
  {
    icon: 'fas fa-sort-alpha-up',
    id: 'sort1',
    name: 'sort',
    value: ['asc', 'namePlayer1'],
    text: 'Name player 1',
  },
  {
    icon: 'fas fa-sort-alpha-down-alt',
    id: 'sort2',
    name: 'sort',
    value: ['desc', 'namePlayer1'],
    text: 'Name player 1',
  },
  {
    icon: 'fas fa-sort-alpha-up',
    id: 'sort3',
    name: 'sort',
    value: ['asc', 'namePlayer2'],
    text: 'Name player 2',
  },
  {
    icon: 'fas fa-sort-alpha-down-alt',
    id: 'sort4',
    name: 'sort',
    value: ['desc', 'namePlayer2'],
    text: 'Name player 2',
  },
  {
    icon: 'fas fa-sort-numeric-up',
    id: 'sort5',
    name: 'sort',
    value: ['asc', 'draws'],
    text: ' Draws',
  },
  {
    icon: 'fas fa-sort-numeric-down-alt',
    id: 'sort6',
    name: 'sort',
    value: ['desc', 'draws'],
    text: 'Draws',
  },
  {
    icon: 'fas fa-sort-numeric-up',
    id: 'sort7',
    name: 'sort',
    value: ['asc', 'wins1'],
    text: 'Wins player 1',
  },
  {
    icon: 'fas fa-sort-numeric-down-alt',
    id: 'sort8',
    name: 'sort',
    value: ['desc', 'wins1'],
    text: 'Wins player 1',
  },
  {
    icon: 'fas fa-sort-numeric-up',
    id: 'sort9',
    name: 'sort',
    value: ['asc', 'wins2'],
    text: 'Wins player 2',
  },
  {
    icon: 'fas fa-sort-numeric-down-alt',
    id: 'sort10',
    name: 'sort',
    value: ['desc', 'wins2'],
    text: 'Wins player 2',
  },
];
