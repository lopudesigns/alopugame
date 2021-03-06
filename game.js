var ani = require('cli-spinners')
var prompt = require("prompt")
var colors = require("colors")

prompt.start()

function newgame() {
	prompt.get("health", function (err, res) {

		res.health = res.health || 5
		var state = {
			actions: [
				"a",
				"d",
				"p"
			],
			"0": {
				health: res.health,
				state: 'open',
				fear: 0,
				log: ''
			},
			"1": {
				health: new Number(res.health) * 1,
				state: 'open',
				fear: 0,
				log: ''
			},
			player: Math.random() > .5 ? 0 : 1,
			turn: 0
		}
		render(state)
		nturn(state)
	})
}


function nturn(state) {
	if (state.player == 0) {
		prompt.get("action", function (err, res) {
			state.action = res.action || state["0"].state
			nnturn(state)
		})
	} else {
		state.action =
			state.actions[Math.round(Math.random() * state.actions.length - 1)]
		setTimeout(function () {
			nnturn(state)
		}, 300)
	}
}

function nnturn(state) {
	var res = {
		action: state.action
	}
	var player = state[state.player]
	var oplayer = state[(2 / (state.player + 1)) - 1]
	player.state = res.action ||
		player.state
	render(state)
	state['0'].log = ''
	state['1'].log = ''

	if (res.action == 'a') {
		if (oplayer.state !== 'd') {
			oplayer.health--
				oplayer.health -= oplayer.fear
			oplayer.log = `Took ${oplayer.fear+1} damage`
		} else {
			player.fear += Math.random() > .95 ? Math.random() * 20 :
				Math.random() > 0.8 ? Math.random() * 10 : Math.random() * 2

		}
	} else if (res.action == 'p') {
		oplayer.fear += Math.random() > .95 ? Math.random() * 20 :
			Math.random() > 0.8 ? Math.random() * 10 : Math.random() * 2
	} else if (res.action == 'd') {
		player.state = res.action
	}
	//    console.log(ani.dots)
	state.turn++

	render(state)



	if (oplayer.health <= 0) {
		console.log(`

game over, player ${state.player} won

`.padStart(15).rainbow)

	} else {
		state.player = (2 / (state.player + 1)) - 1
		setTimeout(function () {
			nturn(state)
		}, 300)
	}

}

function restr(string, times) {
	var repeatedString = "";
	while (times > 0) {
		repeatedString += string;
		times--;
	}
	return repeatedString;
}

function render(state) {
	console.log(`
    

${restr('<3',state['1'].health).padStart(50).red.bold}

${'(*).(*)'.padStart(40).bold.yellow}


${'n__n'.padStart(15).rainbow.bold}

${restr('<3', 
state['0'].health).padStart(15).red.bold}
   ${state['0'].state.padStart(25)}
_-------------------------------
   ${(state['0'].log ? "You "+state['0'].log : 
'')}${(state['1'].log ? "Opponent "+state['1'].log : '')}
`)
}

newgame()