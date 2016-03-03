var Sub1 = function (config) {
    var prop;

    this.val1 = "value1";
    this.val2 = "value2";

    if (config) {
        for (prop in config) {
            this[prop] = config[prop];
        }
    }
    console.log(this);
};

var goodmorning = () => {
  console.log(this);
};

exports.hello  = function(){
    console.log(this);
    //goodmorning();
    return;


};
