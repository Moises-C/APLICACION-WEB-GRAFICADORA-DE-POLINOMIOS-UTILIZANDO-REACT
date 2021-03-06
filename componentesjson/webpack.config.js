module.exports = {
    mode: "development",
    entry: "./src/Inicio.js",
    output: {
    filename: "main.js"
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }    
    }
