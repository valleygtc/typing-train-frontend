import React, { useState, useEffect, useRef } from 'react';
import { message, Modal } from 'antd';

import { fetchArticle, zip } from './utils';


export default function TypingPage({
  history,
  location,
}) {
  const [ article, setArticle ] = useState({
    title: '',
    content: '',
  });
  const [ input, setInput ] = useState('');
  const timer = useRef({});

  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  useEffect(() => {
    const fetchData = async () => {
      let article;
      try {
        article = await fetchArticle(id);
      } catch (e) {
        message.error('网络异常，获取文章失败');
        return
      }
      setArticle({
        title: article.title,
        content: article.content,
      });
    }
    fetchData();
  }, []);

  // 这里不能加空依赖列表 []，因为内部使用了 input。
  // 这里每次渲染都会执行一次 document.addEventListener，按理说每次 handleKeyPress 都是一个新函数，应该会重复注册的，所以会有 bug。但是经实际检验没什么问题，没有重复注册，不清楚为什么。
  // ref: 
  // https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
  // https://github.com/facebook/react/issues/14066
  // https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log('handleKeyPress: %o', { key: event.key });
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return
      }

      const key = event.key;
      event.preventDefault();
      if (key.length === 1) {
        setInput(input + key);
      } else if (key === 'Enter') {
        setInput(input + '\n');
      } else if (key === 'Backspace') {
        setInput(input.slice(0, input.length - 1));
      } else {
        console.log('unhandled key: %o', { key });
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  });

  // timer
  useEffect(() => {
    if (input.length >= 1 && !timer.current.start) {
      // start timer
      timer.current = {
        start: Date.now(),
      };
    }

    if (timer.current.start && input.length === article.content.length) {
      // end
      const duration = Date.now() - timer.current.start; // ms
      const seconds = Math.round(duration / 1000); // s
      const WPM = Math.round((input.length / 5) / (seconds / 60));
      console.log({ timer, timeCount: duration, seconds });
      Modal.info({
        icon: null,
        title: `打字速度报告`,
        content: (
          <div>
            <div>{`总花费时间：${seconds} 秒。`}</div>
            <div>{`WPM：${WPM}`}</div>
          </div>
        ),
        width: '800px',
        onOk() {
          history.goBack();
        },
      });
    }
  })

  const inputItems = Array.from(zip(article.content, input)).map(([c1, c2], index) => {
    if (c1 === c2) {
      return (
        <span key={index} style={{
          background: '#e7fbd3',
          color: '#0e630e',
        }}>{c1}</span>
      )
    } else {
      return (
        <span key={index} style={{
          background: 'pink',
          color: 'darkred',
        }}>{c1}</span>
      )
    }
  });

  const restItems = Array.from(article.content.slice(input.length)).map((c, index) => {
    const key = input.length + index;
    if (index === 0) {
      return (
        <span key={key} style={{
          borderBottom: '3px solid #0a6bf9',
        }}>
          {c}
        </span>
      )
    } else {
      return (
        <span key={key}>{c}</span>
      );
    }
  });

  return (
    <div
      style={{
        fontSize: '35px',
        fontFamily: 'Courier, monospace',
        whiteSpace: 'pre',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {inputItems}
      {restItems}
    </div>
  )
}
