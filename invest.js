function Sim() {
    state = {};
    events = {};
}

Sim.prototype.register = function(name, events, evaluate){

};

// define are primary sim object
var sim = {
    state: {},
    events: [],
    register: function(name, datesf, eval) {
        var dates = datesf();
        console.log('registering', dates.length, name, 'event(s)')
        for (var i = 0; i < dates.length; i++) {
            this.events.push({
                'name': name,
                'date': dates[i],
                'eval': eval
            });
        }
    },
    run: function() {
        console.log('here we go!')
        for (var i = 0; i < this.events.length; i++) {
            this.events[i]['eval'](this.state);
            console.log(this.state);
        }
    }
}

// template
// sim.register(
//     '',
//     function() {
//         return [];
//     },
//     function(state) {
//     }
// )

// vesting commence date
sim.register(
    'vesting commencement',
    function() {
        return [1];
    },
    function(state) {
        state['strike-price'] = 1;
        state['options'] = 10000;
        state['vested-options'] = 0;
        state['shares'] = 0;
        state['shares-sold'] = 0;
        state['cash'] = 0;
    }
)

// vesting
sim.register(
    'vesting',
    function() {
        //var vcd = new Date(2011, 12, 19);
        var dates = [];
        for(var i = 0; i <= 16; i++) {
            dates.push(new Date(2012, 12+3*i, 19));
        }
        return dates;
    },
    function(state) {
        if(state['vested-options'] == 0)
            state['vested-options'] = 2000;
        else
            state['vested-options'] += 500;
    }
)

// exercise
sim.register(
    'shortsale',
    function() {
        return [1];
    },
    function(state) {
        state['shares-sold'] = 1250;
        state['buyback-price'] = 4;
        state['cash'] = state['shares-sold'] * state['buyback-price'];
    }
)

// start the sim
sim.run();
