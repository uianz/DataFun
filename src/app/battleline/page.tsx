'use client';

import React, { useState } from 'react';

import { ScriptProps } from 'next/script';

import { Image, message } from 'antd';

import { BLCard } from '@/app/battleline/components/BoardComponents';

const GlobalCardStyle = 'h-32 w-20';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];

// type Color = 'red' | 'blue' | 'green' | 'yellow' | 'black' | 'pink';

type CardType = 'troop' | 'tactics';

type CardMessage = {
  id: number;
  text?: string;
  color: string;
  type?: CardType;
};

export default function Room() {
  const [allTroopCards, setAllTroopCards] = useState(initAllTroopCards);
  const [myCards, setMyCards] = useState<CardMessage[]>(pop7Cards);
  const [enemyCards, setEnemyCards] = useState<CardMessage[]>(pop7Cards);

  function pop7Cards() {
    const cards = [];
    for (let i = 0; i < 7; i++) {
      cards.push(randomPopCard(allTroopCards));
    }
    return cards;
  }

  return (
    <div className="h-screen w-screen">
      <CardRegion cards={enemyCards} className="h-1/6" />
      <BattleRegion troopCards={allTroopCards} className="h-2/3" />
      <CardRegion cards={myCards} className="h-1/6" />
    </div>
  );
}

function initAllTroopCards() {
  const cards: CardMessage[] = [];
  //每种颜色都有10张,全部初始化
  colors.map((color) => {
    for (let i = 1; i <= 10; i++) {
      cards.push({
        id: i,
        color: color,
        type: 'troop',
      });
    }
  });
  return cards;
}

// function initData() {
//   //随机塞7张CardMessage
//   const cards: CardMessage[] = [];
//   for (let i = 1; i <= 7; i++) {
//     cards.push({
//       id: Math.floor(Math.random() * 10) + 1,
//       // text: i.toString(),
//       color: colors[Math.floor(Math.random() * colors.length)],
//       type: 'troop',
//     });
//   }
//   return cards;
// }

function randomPopCard(cardMessage: CardMessage[]) {
  const index = Math.floor(Math.random() * cardMessage.length);
  const card = cardMessage[index];
  cardMessage.splice(index, 1);
  return card;
}

const CardRegion = (props: { cards: CardMessage[]; className?: string }) => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <div
        className={
          props.className +
          ' mx-80 flex flex-row items-center justify-center space-x-1 border-2 border-red-500'
        }
      >
        {props.cards.map((card) => (
          <div
            className={GlobalCardStyle}
            onClick={() => {
              messageApi.info(`你选择了${card.id}`);
            }}
          >
            <BLCard number={card.id} backgroundColor={card.color} />
          </div>
        ))}
      </div>
    </>
  );
};

const BattleRegion = ({
  troopCards,
  className,
}: {
  troopCards: CardMessage[];
  className?: string;
}) => {
  const flags = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const CardHeap = ({ children }: ScriptProps) => {
    return (
      <div className="flex w-1/12 items-center justify-center border-2 border-yellow-500">
        {children}
      </div>
    );
  };

  const className2 =
    GlobalCardStyle +
    ' flex flex-col items-center justify-center border-2 border-gray-500';
  return (
    <div
      className={
        className +
        ' mx-10 flex flex-row justify-center space-x-2 border-2 border-yellow-500'
      }
    >
      <CardHeap>部队卡牌堆:{troopCards.length}</CardHeap>
      <div className="flex w-5/6 flex-row space-x-2 border-2 border-yellow-500 ">
        {flags.map((flag) => (
          <div
            key={flag}
            className="flex h-full w-1/3 flex-col border-2 border-gray-500"
            // cover={<img alt="example" src="/images/1.png" />}
          >
            <div className="h-2/5 pl-7">
              <div className={GlobalCardStyle + ' z-50'}>
                <BLCard
                  number={troopCards[0].id}
                  backgroundColor={troopCards[0].color}
                />
              </div>
              <div className={GlobalCardStyle + ' -translate-y-24 z-30'}>
                <BLCard
                  number={troopCards[11].id}
                  backgroundColor={troopCards[11].color}
                />
              </div>
              <div className={GlobalCardStyle + ' -translate-y-48 z-40'}>
                <BLCard
                  number={troopCards[22].id}
                  backgroundColor={troopCards[22].color}
                />
              </div>
              <div className={GlobalCardStyle + ' -translate-y-72 z-50'}>
                <BLCard
                  number={troopCards[33].id}
                  backgroundColor={troopCards[33].color}
                />
              </div>
            </div>
            <div className="flex h-1/5 items-center justify-center border-2 border-red-500">
              <Image
                src="flag.png"
                width="40px"
                height="60px"
                preview={false}
              />
              {flag}
            </div>
            <div className="h-2/5 pl-7">
              <div className={GlobalCardStyle + ' '}>
                <BLCard
                  number={troopCards[2].id}
                  backgroundColor={troopCards[2].color}
                />
              </div>
              <div className={GlobalCardStyle + ' -translate-y-24'}>
                <BLCard
                  number={troopCards[12].id}
                  backgroundColor={troopCards[12].color}
                />
              </div>
              <div className={GlobalCardStyle + ' -translate-y-48'}>
                <BLCard
                  number={troopCards[23].id}
                  backgroundColor={troopCards[23].color}
                />
              </div>
              <div className={GlobalCardStyle + ' -translate-y-72'}>
                <BLCard
                  number={troopCards[34].id}
                  backgroundColor={troopCards[34].color}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <CardHeap>战术卡牌堆: 10</CardHeap>
    </div>
  );
};
