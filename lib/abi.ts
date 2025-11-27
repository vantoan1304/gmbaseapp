export const gmAbi = [
  {
    "inputs": [],
    "name": "gm",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType":"address","name":"user","type":"address"}],
    "name": "canGM",
    "outputs": [{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":[{"internalType":"address","name":"user","type":"address"}],
    "name":"getStreak",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed":true,"internalType":"address","name":"user","type":"address"},
      {"indexed":false,"internalType":"uint256","name":"day","type":"uint256"},
      {"indexed":false,"internalType":"uint256","name":"streak","type":"uint256"}
    ],
    "name":"GM",
    "type":"event"
  }
];
