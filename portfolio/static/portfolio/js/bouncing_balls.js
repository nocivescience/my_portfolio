(function(undefined) {
	if(document.createElement('canvas')) {
		var Dot = function (size, color) {
			this.size = size;
			if(size < 20) {
				this.speedX = 15*Math.random();
				this.speedY=15*Math.random()
			} else if(size < 30) {
				this.speedX = 10*Math.random();
				this.speedY = 10*Math.random();
			} else {
				this.speedX = 5*Math.random();
				this.speedY=5*Math.random()
			}
			this.color = color;
			this.xpos = Math.random() * screen.availWidth - this.size+150;
			this.ypos = Math.abs(Math.random() * screen.availHeight - this.size);
			if(this.xpos<100){
				this.xpos=100
			}
			if(this.xpos>maxX-100){
				this.xpos=maxX-100
			}
			if(this.ypos<100){
				this.ypos=100
			}
			if(this.ypos>maxY-100){
				this.ypos=maxY-100
			}
			this.offset = 100 * Math.random();
		};
		Dot.prototype.tick = function() {
			if(this.xpos > maxX-this.size) {
				this.speedX*=-1;
			}
			if(this.xpos<this.size){
				this.speedX*=-1
			}
			if(this.ypos > maxY-this.size){
				this.speedY *= -1;
			}
			if(this.ypos < this.size){
				this.speedY *= -1;
			}
			this.xpos+=this.speedX;
			this.ypos+=this.speedY
		};
		Dot.prototype.named= function(){
			context.font=`${this.size/2}px Arial`;
			context.fillStyle='white';
			context.fillText('Ball',this.xpos-this.size+this.size/2,this.ypos-this.size-this.size/2);
		}
		Dot.prototype.draw = function() {
			context.shadowColor = this.color;
			context.fillStyle = this.color;
			context.beginPath();
			context.arc(this.xpos, this.ypos, this.size, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
		};
		var reDraw = function() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			for(var dot in dots) {
				dots[dot].draw();
				dots[dot].tick();
				dots[dot].named();
			}
		};
		maxX = screen.availWidth;
		maxY = screen.availHeight;
		var canvas = document.getElementById('background');
		canvas.width = screen.availWidth;
		canvas.height = screen.availHeight;
		var context = canvas.getContext('2d');
		context.globalAlpha = 0.7;

		var dots = new Array(60);
		var dot;
		for(var i = 0; i < 60; ++i) {
			dot = new Dot(10 + 40 * Math.random(), '#' + Math.floor(Math.random() * 16777215).toString(16));
			dots[i] = dot;
		}
		setInterval(reDraw, 30);
	}
})();