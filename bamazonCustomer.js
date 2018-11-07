var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    var query0 = `SELECT item_id, product_name FROM products`
    connection.query(query0, function(err, res) {
        console.log(`item_id: product_name`);
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id}: ${res[i].product_name}`);
        }
        _init();
    })
});

 function _init() {
        var flag = 1
        inquirer.prompt({
            name: "action",
            type: "input",
            message: "What is the product you would like to buy (item_id please)?"
        })
        .then(function(answer) {
            inquirer.prompt({
                name: "action",
                type: "input",
                message: `how many units of item_id ${answer.action}?`
            })
            .then(function(answer2) {
                    console.log(answer.action)
                    var query = `SELECT stock_quantity FROM products WHERE item_id = ${answer.action}`
                    connection.query(query, function(err, res) {
                            if(res[0].stock_quantity >= answer2.action){
                                console.log('your item has been ordered')
                                var query2 = `UPDATE products SET stock_quantity = ${res[0].stock_quantity - answer2.action} WHERE item_id = ${answer.action}`
                                connection.query(query2, function(err, res) {
                                    if (err) throw err;
                                    init()
                                })
                            }else{
                                console.log('insufficient stock. please try again')
                                init()
                            }
                    })
                })
        })

}

  