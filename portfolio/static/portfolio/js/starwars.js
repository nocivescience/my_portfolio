const canvas = document.getElementById('game-canvas')
      const ctx = canvas.getContext('2d')
      const roidsNum = 20
      let theme = new Audio("{% static 'portfolio/audios/starwars/starwar.mp3' %}")
      let perder = new Audio("{% static 'portfolio/audios/starwars/perder.mp3' %}")
      audios = []
      for (i of [1, 2, 3]) {
        let disp = new Audio(`{$ static 'portfolio/audios/starwars/dis${i}' $}`)
        audios.push(disp)
      }
      const colors = ['rgb(180, 162, 60)']
      let roids
      let score = 0
      createAsteroidBelt()
      function drawScore() {
        ctx.font = '30px VT323'
        ctx.fillStyle = 'rgb(0, 255, 13)'
        ctx.fillText(`Score: ${score}`, canvas.width - 200, 30)
      }
      function theGirl() {
        ctx.font = '25px VT323'
        ctx.fillStyle = 'rgb(0, 255, 13)'
        ctx.fillText('The Girl with the Pilot Jacket', 200, 30)
      }
      function createAsteroidBelt() {
        roids = []
        let x, y
        for (let i = 1; i < roidsNum; i++) {
          x = Math.floor(Math.random() * canvas.width)
          y = -50
          r = 70 * Math.random()
          roids.push(newAsteroid(x, y, r < 20 ? 20 : r))
        }
      }
      function newAsteroid(x, y, r) {
        let roid = {
          x: x,
          y: y,
          r: r,
          xv: 0,
          yv: Math.random() * 8,
          a: Math.random() * Math.PI * 2,
          offs: [],
          vert: Math.floor(Math.random() * 12 + 1) + 6,
        }
        for (let i = 0; i < roid.vert; i++) {
          roid.offs.push(Math.random() * 0.8 + 0.6)
        }
        return roid
      }
      function update() {
        for (let i = 0; i < roids.length; i++) {
          ctx.fillStyle = colors[i % colors.length]
          ctx.moveTo(
            roids[i].x + roids[i].r * roids[i].offs[0] * Math.cos(roids[i].a),
            roids[i].y + roids[i].r * roids[i].offs[0] * Math.sin(roids[i].a),
          )
          for (let j = 1; j < roids[i].vert; j++) {
            ctx.lineTo(
              roids[i].x +
                roids[i].r *
                  roids[i].offs[j] *
                  Math.cos(roids[i].a + (j * Math.PI * 2) / roids[i].vert),
              roids[i].y +
                roids[i].r *
                  roids[i].offs[j] *
                  Math.sin(roids[i].a + (j * Math.PI * 2) / roids[i].vert),
            )
          }
          ctx.closePath()
          ctx.fill()
        }
        for (let i = 0; i < roids.length; i++) {
          roids[i].y += roids[i].yv / 12
          if (score > 10000) {
            roids[i].y += roids[i].yv / 10
          }
          if (score > 20000) {
            roids[i].y += roids[i].yv / 8
          }
          if (roids[i].y > canvas.height) {
            score = 0
            perder.play()
            theme.pause()
          }
        }
      }
      let missiles = []
      const ship = {
        y: canvas.height,
        x: canvas.width / 2,
        h: 40,
        w: 10,
        bg: 'white',
        laser: [
          'rgb(195, 255, 55)',
          'rgb(55, 225, 255)',
          'rgb(234, 128, 255)',
          'rgb(255, 38, 38)',
        ],
        direction: null,
        dx: null,
        dy: null,
      }
      function render() {
        ship.dx = 7
        if (ship.direction == 'left') {
          ship.x -= ship.dx
          if (ship.x < 0) {
            ship.x = 0
            ship.direction = ''
          }
        } else if (ship.direction == 'right') {
          ship.x += ship.dx
          if (ship.x > canvas.width) {
            ship.x = canvas.width
            ship.direction = ''
          }
        }
        ctx.strokeStyle = ship.bg
        ctx.lineWidth = ship.w
        ctx.beginPath()
        ctx.moveTo(ship.x, ship.y)
        ctx.lineTo(ship.x, ship.y - ship.h)
        ctx.closePath()
        ctx.stroke()
        for (let i = 0; i < missiles.length; i++) {
          let m = missiles[i]
          ctx.fillStyle = ship.laser[i % ship.laser.length]
          ctx.fillRect(m.x, (m.y -= 5), m.w, m.h - 10)
        }
      }
      function missilAndRoids() {
        for (let i = missiles.length - 1; i >= 0; i--) {
          for (let j = roids.length - 1; j >= 0; j--) {
            distanceX = Math.abs(missiles[i].x - roids[j].x) < roids[j].r
            distanceY = Math.abs(missiles[i].y - roids[j].y) < roids[j].r
            if (distanceX && distanceY) {
              roids[j].y = -50
              score++
              // missiles.splice(i,1);
              // roids.splice(j,1);
            }
          }
        }
      }
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        missilAndRoids()
        render()
        update()
        drawScore()
        theGirl()
      }
      setInterval(animate, 6)
      document.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'a':
            ship.direction = 'left'
            break
          case 'd':
            ship.direction = 'right'
            break
        }
      })
      document.addEventListener('keyup', (e) => {
        switch (e.key) {
          case 'a':
            ship.direction = ''
            ship.x += 0
            break
          case 'd':
            ship.direction = ''
            ship.x += 0
            break
        }
      })
      function bala(e) {
        if (e.key == 'p') {
          missiles.push({
            x: ship.x - 1,
            y: ship.y - 100,
            dy: 5,
            w: 3,
            h: 70,
          })
          audios[Math.floor(Math.random() * audios.length)].play()
          theme.play()
        }
      }
      document.addEventListener('keydown', bala)