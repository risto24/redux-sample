import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';

// stateの初期状態を定義
const initialState = {
  task: '',
  tasks: []
};

/* Reducerの定義(状態を変化させるための関数)
 * actionが発行されるとここで状態を動的に変化させる
 */
function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_TASK':
      return {
        ...state,
        task: action.payload.task
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task])
      };
    default:
      return state;
  }
}

/* Storeを生成する
 *Storeとはアプリケーション内の状態ツリー管理のこと
 * 第一引数にReducerを渡す
 */
const store = createStore(tasksReducer);

// アクションを生成
const inputTask = (task) => ({
  type: 'INPUT_TASK',
  payload: {
    task
  }
});

// アクションを生成
const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: {
    task
  }
});

/*
 * 全体の流れ
 * 入力された値を引数にアクションが実行される
 * ↓
 * actionでtypeを指定し、paylordに内容を追加してReducerになげる
 * ↓
 * ReducerでStoreを生成する
 */
function TodoApp({ store }) {
  const { task, tasks } = store.getState();
  return (
    <div>
      {/* dispachメソッドを使うことで、指定したアクションが発行され、Reducerによって状態が変化する */ }
      <input type="text" onChange={(e) => store.dispatch(inputTask(e.target.value))} />
      <input type="button" value="add" onClick={() => store.dispatch(addTask(task))} />
      <ul>
        {
          tasks.map(function(item, i) {
            return (
              <li key={i}>{item}</li>
            );
          })
        }
      </ul>
    </div>
  );
}

function renderApp(store) {
  render(
    <TodoApp store={store} />,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);