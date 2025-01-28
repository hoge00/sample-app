const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// テンプレートエンジンとしてEJSを使用
app.set('view engine', 'ejs');

// ミドルウェアの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Todo項目を保存する配列
let todos = [];

// ルートページの表示
app.get('/', (req, res) => {
  res.render('index', { todos });
});

// 新しいTodoの追加
app.post('/add', (req, res) => {
  const todo = req.body.todo;
  if (todo) {
    todos.push({
      id: Date.now(),
      text: todo,
      completed: false
    });
  }
  res.redirect('/');
});

// Todoの削除
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.redirect('/');
});

// Todoの完了状態の切り替え
app.post('/toggle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});