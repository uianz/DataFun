import React from 'react';

import { Client, Lobby } from 'boardgame.io/react';
import { render } from 'react-dom';

import App from '@/app/App';
import Room from '@/app/battleline/page';
import { Board } from '@/app/game/Board';
import { TicTacToe } from '@/app/game/page';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { TicTacToeBoard } from '@/components/TicTacToeBoard';

// import FormComponent from "@/components/FormComponent";
//
// const App = Client({
//   game: TicTacToe,
//   board: Board,
// });
// export default function Page() {
//   // return <Room />;
//   // return <App />;
// }


const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <Lobby
      gameServer={`http://localhost:8000`}
      lobbyServer={`http://localhost:8000`}
      gameComponents={[
        { game: TicTacToe, board: TicTacToeBoard }
      ]}
    />;
  </Layout>
)

export default IndexPage