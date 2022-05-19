const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You crashed your spaceship and decide to bring a gun, your backup tools that aren\'t really used much, or your brand new tools that might fail on you, to hopefully sell for parts to repair your spaceship.',
    options: [
      {
        text: 'Take the gun',
        setState: { gun: true },
        nextText: 2
      },
      {
        text: 'Take the backup tools',
        setState: { toolBox: true},
        nextText: 2
      },
      {
        text: 'Take the brand new tools',
        setState: { newToolBox: true},
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'As you explore, you find a alien running towards you.',
    options: [
      {
        text: 'Go towards the alien',
        nextText: 3
      },
      {
        text: 'Run away',
        nextText: 4
      },
      {
        text: 'Kill the alien',
        requiredState: (currentState) => currentState.gun,
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'Curious at the alien, you continue towards the alien to see that it needs help fixing his broken spacecraft.',
    options: [
      {
        text: 'Join the alien to find help',
        requiredState: (currentState) => currentState.gun,
        nextText: 6
      },
      {
        text: 'Offer to help since you have your tools',
        requiredState: (currentState) => currentState.toolBox,
        nextText: 7
      },
      {
        text: 'Offer to help since you have your tools',
        requiredState: (currentState) => currentState.newToolBox,
        nextText: 8
      }
    ]
  },
  {
    id: 4,
    text: 'Afraid of what might happen, you run away and search somewhere else to sell your stuff but get ganged up by aliens and die.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You killed the alien and continue searching else where. You face a gang of aliens and are unable to defend yourself since you ran out of bullets trying to defend yourself.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Unable to help, you join the alien to look for others. Ganged up by a group of alien, you were sucessful in defeating them together.',
    options: [
      {
        text: 'Continue searching',
        nextText: 11
      }
    ]
  },
 {
    id: 7,
    text: 'Your tools aren\'t advanced enough to help fix their spaceship. Angered that you\'ve wasted their time they decided to kill you.',
    options: [
      {
        text: 'Restart.',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'Amazed at your tools the alien wants to trade some stuff for them.',
    options: [
      {
        text: 'Accept offer',
        nextText: 9
      },
      {
        text: 'Reject offer',
        nextText: 10
      }
    ]
  },
  {
    id: 9,
    text: 'You accepted and traded your new tools for parts to repair your spaceship. You used your backup tools to fix your ship and left the planet',
    options: [
      {
        text: 'Congradulations. Play Again.',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Not liking being rejected, the alien decided to end you and steal the tools for themselves.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You and the alien were able to find a market and you both of you got your needs met.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()