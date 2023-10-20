import { Client } from 'boardgame.io/react';

import { Board } from '@/app/game/Board';
import { TicTacToe } from '@/app/game/page';

export default Client({ game: TicTacToe, board: Board });
