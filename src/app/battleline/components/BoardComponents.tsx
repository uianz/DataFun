// 'use-client';
import React, { useEffect, useRef } from 'react';

import { message } from 'antd';

interface CardProps {
  number: number;
  backgroundColor: string;
}

export const BLCard: React.FC<CardProps> = ({ number, backgroundColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // // 绘制底图
    // ctx.fillStyle = backgroundColor;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    //
    // // 绘制左上角数字
    // ctx.fillStyle = 'white';
    // ctx.font = 'bold 36px Arial';
    // ctx.fillText(number.toString(), 20, 35);
    //
    // // 绘制右下角数字
    // ctx.fillStyle = 'white';
    // ctx.font = 'bold 36px Arial';
    // ctx.fillText(number.toString(), canvas.width - 35, canvas.height - 15);
    //上级元素的宽度
    let card_width = 80;
    let card_height = 120;
    let padding = 7;
    let inset_width = 20;
    let inset_height = 25;
    let text = number.toString();
    let color = backgroundColor;
    let highlight: string | null = null;
    if (true) {
      highlight = '#FFFFFF';
    }
    drawCardOutline(ctx, card_width, card_height, 7, highlight);
    ctx.fillStyle = color;
    ctx.fillRect(
      padding,
      padding,
      card_width - 2 * padding,
      card_height - 2 * padding,
    );
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(padding, padding, inset_width, inset_height);
    ctx.fillRect(
      card_width - padding - inset_width,
      card_height - padding - inset_height,
      inset_width,
      inset_height,
    );
    ctx.font = '18px Verdana';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    let lineHeight = ctx.measureText('M').width;
    for (let i = 0; i !== 2; i++) {
      if (text !== 'T') {
        ctx.fillText(
          text,
          padding + inset_width / 2,
          padding + inset_height / 2 + lineHeight / 2 - 2,
        );
      } else {
        let reduce_spacing = 4;
        let width_1 = ctx.measureText('1').width;
        let width_0 = ctx.measureText('0').width;

        ctx.fillText(
          '1',
          padding + inset_width / 2 - width_1 / 2 + reduce_spacing / 2,
          padding + inset_height / 2 + lineHeight / 2 - 2,
        );
        ctx.fillText(
          '0',
          padding + inset_width / 2 + width_0 / 2 - reduce_spacing / 2,
          padding + inset_height / 2 + lineHeight / 2 - 2,
        );
      }
      if (text === '6' || text === '9') {
        let width = ctx.measureText(text).width;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(
          padding + inset_width / 2 - width / 2,
          padding + inset_height / 2 + lineHeight / 2 + 1,
        );
        ctx.lineTo(
          padding + inset_width / 2 + width / 2,
          padding + inset_height / 2 + lineHeight / 2 + 1,
        );
        ctx.stroke();
      }
      ctx.rotate(Math.PI);
      ctx.translate(-card_width, -card_height);
    }
  }, [number, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      // className="h-full w-full"
      onClick={() => {
        messageApi.info(`你选择了${number}`);
      }}
    />
  );
};

function drawCardOutline(ctx, width, height, corner_radius, fill_color) {
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = fill_color;
  let lineWidth = 2;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(corner_radius + lineWidth / 2, lineWidth / 2);
  ctx.lineTo(width - corner_radius - lineWidth / 2, lineWidth / 2);
  ctx.arcTo(
    width - lineWidth / 2,
    lineWidth / 2,
    width - lineWidth / 2,
    corner_radius + lineWidth / 2,
    corner_radius + lineWidth / 2,
  );
  ctx.lineTo(width - lineWidth / 2, height - corner_radius - lineWidth / 2);
  ctx.arcTo(
    width - lineWidth / 2,
    height - lineWidth / 2,
    width - corner_radius - lineWidth / 2,
    height - lineWidth / 2,
    corner_radius + lineWidth / 2,
  );
  ctx.lineTo(corner_radius + lineWidth / 2, height - lineWidth / 2);
  ctx.arcTo(
    lineWidth / 2,
    height - lineWidth / 2,
    lineWidth / 2,
    corner_radius + lineWidth / 2,
    corner_radius + lineWidth / 2,
  );
  ctx.lineTo(lineWidth / 2, corner_radius + lineWidth / 2);
  ctx.arcTo(
    lineWidth / 2,
    lineWidth / 2,
    corner_radius + lineWidth / 2,
    lineWidth / 2,
    corner_radius + lineWidth / 2,
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// export default Card;
