const {app, BrowserWindow, TouchBar} = require('electron')
const player = require('play-sound')(opts = {})

const {TouchBarLabel, TouchBarButton} = TouchBar

let window

function musicPlayer() {
  return player.play('sounds/quack.mp3', {afplay: ['-v', 1 ]}, function(err){
    if (err) throw err
  })
}


const duckTouchBarButton =  new TouchBarButton ({
  label:'',
  backgroundColor: '#000000',
  icon: 'images/duck/duck1.png',
  click: musicPlayer,
})

const touchBar = new TouchBar({
  items: [duckTouchBarButton],
})

let frame = 0;

const updateFrames = () => {
  if (frame === 2) {
    frame = 1;
  } else {
    frame += 1;
  }
  const duckPath = `images/duck/duck${frame}.png`;
  duckTouchBarButton.icon = duckPath;
}

const animateFrames = () => {
  setInterval(updateFrames, 100)
};

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 80,
    height: 30,
    backgroundColor: '#0000',
    minimizable: false,
    maximizable: false,
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
  animateFrames()
})


app.on('window-all-closed', () => {
  app.quit()
})
