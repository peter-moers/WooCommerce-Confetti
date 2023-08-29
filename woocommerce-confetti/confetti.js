
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      const confetti_canvas = document.createElement("canvas"); // Create a canvas element
      confetti_canvas.style.position = "fixed"; // Use 'fixed' positioning
      confetti_canvas.style.bottom = "0";
      confetti_canvas.style.left = "0";
      document.body.appendChild(confetti_canvas); // Append canvas to body
  
      const ctx = confetti_canvas.getContext("2d");
  
      confetti_canvas.width = window.innerWidth;
      confetti_canvas.height = window.innerHeight;
  
      const confettiColors = ["#64c000", "#ffd700", "#1e90ff"];
      const confettiPieces = 200;
      const gravity = 0.1;
      const resistance = 0.999;
  
      function Confetti(x, y, color, isRight) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = Math.random() * 10 + 5;
        this.height = this.width * 0.6;
        this.angle = Math.random() * 360;
        this.rotation = Math.random() * 360;
        if(isRight) {
          this.velocityX = Math.random() * -10 - 1;
        } else {
          this.velocityX = Math.random() * 10 + 1;
        }
        this.velocityY = Math.random() * -10 - 5; // Adjust the initial velocity for upward motion
      }
  
      Confetti.prototype.update = function() {
        if (this.y < confetti_canvas.height + this.height) {
          this.velocityX = this.velocityX*resistance;
          this.velocityY += gravity;
  
  
          this.x += this.velocityX;
  
          
          this.y += this.velocityY;
          this.rotation += 2;
        }
      };
  
      function createConfetti() {
        for (let i = 0; i < confettiPieces; i++) {
          const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          const x = 0;
          const y = confetti_canvas.height;
          confetti.push(new Confetti(x, y, color));
        }
      }
  
      function createConfettiBatch(batchSize, delay) {
      let count = 0;
      const interval = setInterval(function() {
        for (let i = 0; i < batchSize; i++) {
          //left
          const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          const x = 0;
          const y = confetti_canvas.height;
          confetti.push(new Confetti(x, y, color, false));
  
          //right
          const color_right = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          const x_right = confetti_canvas.width;
          const y_right = confetti_canvas.height;
          confetti.push(new Confetti(x_right, y_right, color_right, true));
  
          count++;
          if (count >= confettiPieces) {
            clearInterval(interval);
            break;
          }
        }
      }, delay);
    }
  
      function animateConfetti() {
        ctx.clearRect(0, 0, confetti_canvas.width, confetti_canvas.height);
  
        for (let i = confetti.length - 1; i >= 0; i--) {
          const piece = confetti[i];
          piece.update();
          ctx.save();
          ctx.translate(piece.x, piece.y);
          ctx.rotate((piece.rotation * Math.PI) / 180);
          ctx.fillStyle = piece.color;
          ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
          ctx.restore();
  
          if (piece.y > confetti_canvas.height + piece.height) {
              confetti.splice(i, 1); // Remove off-screen confetti
          }
        }
  
        requestAnimationFrame(animateConfetti);
      }
  
      const confetti = [];
      createConfettiBatch(10,50);
      animateConfetti();
    }, 500);
  });