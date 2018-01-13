# web-design-webpack

## Directory
The `.js` file inside `entry/` should be paired with the `.html` file in the root directory. It is automatically combined by webpack.
```
./src/
    |- assets/
    |   |- fonts/
    |   |- images/
    |
    |- js/
    |   |- entry/
    |   |   |- index.js
    |   |   |- about.js
    |   |
    |   |- modules/
    |       |- hoge.js
    |
    |- stylus/
    |   |- entry/
    |   |   |- index.styl
    |   |   |- about.styl
    |   |
    |   |- common/
    |       |- common.styl
    |
    |- index.html
    |- about.html
```


