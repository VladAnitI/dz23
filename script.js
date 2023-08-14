const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Создаем пустой файл .json для БД, который будет храниться на вашем сервере
fs.writeFile(path.join(__dirname, 'users.json'), '[]', (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

// Реализуем алгоритм на сервере, который заполняет массив объектами со следующими полями (~30 объектов)
app.get('/generate', (req, res) => {
  const names = ['John', 'Jane', 'Mike', 'Sara', 'David'];
  const countries = ['USA', 'Canada', 'UK', 'Germany', 'France'];
  const users = [];

  for (let i = 0; i < 30; i++) {
    const user = {
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 100) + 1,
      country: countries[Math.floor(Math.random() * countries.length)],
    };
    users.push(user);
  }

  // Передаем массив в файл БД
  fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users), (err) => {
    if (err) throw err;
    console.log('Data is written to file successfully.');
    res.send('Data is written to file successfully.');
  });
});

app.get('/list', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
    //   if (err) throw err;
      const users = JSON.parse(data);
      console.log(users)
      ejs.renderFile(path.join(__dirname, 'list.ejs'), { users }, (err, html) => {
        // if (err) throw err;
        res.send(html);
      });
    });
});  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
