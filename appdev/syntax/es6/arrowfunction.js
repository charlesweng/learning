let deliveryBoy = {
    name: 'John',

    handleMessage: function (message, handler) {
        handler(message);
    },

    receive: function() {
        this.handleMessage('Hello, ', (message) => {
            console.log(message + this.name); // used to be var that = this if no arrow function is used.
        })
    }
};

deliveryBoy.receive();