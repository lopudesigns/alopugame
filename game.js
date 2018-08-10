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
			turn: 0,
			log: ''
		}
		
		renderloop(state)
		nturn(state, state.player)
		var playern = (2 / (state.player + 1)) - 1
		nturn(state, playern)
	})
}


function nturn(state, playern) {
	if(state.stop) {
		return
	}
	if (playern == 0) {
		prompt.get("action", function (err, res) {
			state.action = res.action || state["0"].state
			nnturn(state, playern)
		})
	} else {
		state.action =
			state.actions[Math.round(Math.random() * state.actions.length - 1)]
			setTimeout(function () {
				nnturn(state, playern)
			}, Math.random()*2000)
	}

}

function nnturn(state, playern) {
	var res = {
		action: state.action
	}
	var player = state[playern]
	var oplayer = state[(2 / (playern + 1)) - 1]
	player.state = res.action ||
	player.state
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
		// render(state)
		setTimeout(function(){
		}, 0)
	
	
		setTimeout(function () {
			oplayer.log = ''
			// state['1'].log = ''
	
		}, 1000)
	
		if (oplayer.health <= 0) {
			state.log = `game over, player ${playern} won`.padStart(15).rainbow
			state.stop = true
			setTimeout(function(){
				state['0'].log = ''
				state['1'].log = ''
				// setTimeout(function(){
				// }, 200)
				// render(state)
				prompt.get("y", function (err, res) {
					if(res.y == 'y'){
						newgame()
					}
				})
			}, 400)
		} else {
				nturn(state, playern)
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
${(state['1'].log ? 
`_-------------------------------_
Opponent ${state['1'].log}`.padStart(20) : `


`)}
${'n__n'.padStart(15).rainbow.bold}

${restr('<3', 
state['0'].health).padStart(15).red.bold}
   ${state['0'].state.padStart(25)}
_-------------------------------_
   ${(state['0'].log ? "You "+state['0'].log : 
'')}${state.log}
`)
}

function renderloop(state){
	if(state.stop){
		return
	}
	setTimeout(function(){
		render(state)
		renderloop(state)
	}, 200)
}

newgame()

