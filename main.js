var game = new Phaser.Game(800, 600, Phaser.AUTO, 'roundup');

var menu = (function(){
  var o ={
    l : {},
    preload: function(){
      game.load.image('background', 'assets/start-screen.png');
      game.load.image('start', 'assets/start-btn.png');

    },
    create: function(){
      game.add.sprite(0,0, 'background');
      var button = game.add.button(game.world.centerX-150, game.world.centerY+150, 'start', o.l.startGame);
      button.anchor.setTo(0.5);
      button.scale.setTo(0.9);
    },
  };

  o.l.startGame = function(){
    game.state.start('level1');
  };

  return o;
})();

var level1 = (function(){
  var platforms, player, baddiesX, baddiesZ, scoreText;
  //var score = 0;
  var o = {
    l :{},

    preload: function(){
      game.load.image('background', 'assets/background.png');
      game.load.image('start', 'assets/star.png');
      game.load.image('ground', 'assets/platform.png');
      game.load.image('baddiesZ', 'assets/equality.png');
      game.load.image('baddiesX1', 'assets/money.png');
      game.load.image('baddiesX2', 'assets/ballot.png');
      game.load.image('baddiesX3', 'assets/birthcontrol.png');
      game.load.image('baddiesX4', 'assets/grad.png');
      game.load.image('baddiesX5', 'assets/nonviolence.png');
      game.load.spritesheet('fighter', 'assets/ninja-girl.png', 62, 78);
      game.load.audio('song', 'assets/background.mp3');
      game.load.audio('jump', 'assets/jump.wav');
      game.load.audio('killX', 'assets/kill_X.wav');
      game.load.audio('killZ', 'assets/kill_Z.mp3');
      //game.load.audio('song', '/assets/music.mp3');
      o.l.song = game.add.audio('song');
      o.l.song.loop = true;
      o.l.song.play();
    },
    create: function(){
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.add.sprite(0,0,'background');
      // Ledges
      platforms = game.add.group();
      platforms.enableBody = true;

      o.l.score = 0;

      var ground = platforms.create(0, game.world.height -64, 'ground');
      ground.scale.setTo(2, 2);
      ground.body.immovable = true;

      var ledge = platforms.create(-50, 400, 'ground');
      ledge.body.immovable = true;

      var ledge = platforms.create(500, 400, 'ground');
      ledge.body.immovable = true;


      var ledge = platforms.create(-150, 250, 'ground');
      ledge.body.immovable = true;


      var ledge2 = platforms.create(200, 85, 'ground');
      ledge2.scale.setTo(0.2, 2);
      ledge2.body.immovable = true;

      var ledge3 = platforms.create(400, 150, 'ground');
      ledge3.scale.setTo(0.4, 1.5);
      ledge3.body.immovable = true;

      var ledge4 = platforms.create(600, 100, 'ground');
      ledge4.scale.setTo(0.3, 1.8);
      ledge4.body.immovable = true;


      //Fighter
      player = game.add.sprite(game.world.centerX, game.world.height - 150, 'fighter');
      game.physics.arcade.enable(player);
      o.l.jumpSound = game.add.audio('jump');
      o.l.killXSound = game.add.audio('killX');
      o.l.killZSound = game.add.audio('killZ');

      player.body.bounce.y = 0.2;
      player.body.gravity.y = 300;
      player.body.collideWorldBounds = true;


      player.animations.add('left', [0,1], 5, true);
      player.animations.add('right', [3,4], 5, true);
      cursors = game.input.keyboard.createCursorKeys();

      scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });

      baddiesX = game.add.group();
      baddiesX.enableBody = true;


      baddiesZ = game.add.group();
      baddiesZ.enableBody = true;
      //baddiesZ.body.collideWorldBounds = true;
      baddiesZ.createMultiple(10, 'baddiesZ');
      //baddiesZ = game.add.group();
      //baddiesZ.enableBody = true;

      var baddieX1 = baddiesX.create(10, 0, 'baddiesX1');
      baddieX1.body.gravity.y = 150;
      baddieX1.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX1.body.collideWorldBounds = true;
      var baddieX2 = baddiesX.create(80, 0, 'baddiesX2');
      baddieX2.body.gravity.y = 150;
      baddieX2.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX2.body.collideWorldBounds = true;
      var baddieX3 = baddiesX.create(150, 0, 'baddiesX3');
      baddieX3.body.gravity.y = 150;
      baddieX3.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX3.body.collideWorldBounds = true;
      var baddieX4 = baddiesX.create(210, 0, 'baddiesX4');
      baddieX4.body.gravity.y = 150;
      baddieX4.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX4.body.collideWorldBounds = true;
      var baddieX5 = baddiesX.create(300, 0, 'baddiesX5');
      baddieX5.body.gravity.y = 150;
      baddieX5.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX5.body.collideWorldBounds = true;
      var baddieX6 = baddiesX.create(420, 0, 'baddiesX1');
      baddieX6.body.gravity.y = 150;
      baddieX6.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX6.body.collideWorldBounds = true;
      var baddieX7 = baddiesX.create(500, 0, 'baddiesX2');
      baddieX7.body.gravity.y = 150;
      baddieX7.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX7.body.collideWorldBounds = true;
      var baddieX8 = baddiesX.create(600, 0, 'baddiesX3');
      baddieX8.body.gravity.y = 150;
      baddieX8.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX8.body.collideWorldBounds = true;
      var baddieX9 = baddiesX.create(660, 0, 'baddiesX4');
      baddieX9.body.gravity.y = 150;
      baddieX9.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX9.body.collideWorldBounds = true;
      var baddieX10 = baddiesX.create(740, 0, 'baddiesX5');
      baddieX10.body.gravity.y = 150;
      baddieX10.body.bounce.y = 0.3 + Math.random() * 0.2;
      baddieX10.body.collideWorldBounds = true;

      game.time.events.add(Phaser.Timer.SECOND * 30, gameOver, this);
      if(o.l.score === 600){gameOver();}

      setTimeout(function(){
        baddiesX.forEachAlive(function(baddieX){
          var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
          var xOffset = (Math.floor(Math.random() * 100) + 50) * plusOrMinus;
          var interval = Math.floor(Math.random() * 4000) + 2000;
          game.add.tween(baddieX).to( { x: baddieX.position.x - xOffset }, interval, Phaser.Easing.Linear.None, true, 0, 1000, true);
        });
      }, 5000);

      function gameOver(){
        game.state.start('menu');
        o.l.score = 0;
      }

    },
    update: function(){
      game.physics.arcade.collide(player, platforms);
      game.physics.arcade.collide(baddiesX, platforms);
      game.physics.arcade.collide(baddiesZ, platforms);
      game.physics.arcade.overlap(player, baddiesX, collectBaddieX, null, this);
      game.physics.arcade.overlap(player, baddiesZ, collectBaddieZ, null, this);

      player.body.velocity.x = 0;
      if (cursors.left.isDown)
      {
        player.body.velocity.x = -150;
        player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
        player.body.velocity.x = 150;
        player.animations.play('right');
      }
      else
      {
        player.animations.stop();
        player.frame = 2;
      }

      if (cursors.up.isDown && player.body.touching.down)
      {
        player.body.velocity.y = -350;
        o.l.jumpSound.play();
      }


      function collectBaddieX(player, baddieX){
        baddieX.kill();
        o.l.killXSound.play();

        o.l.score += 20;
        scoreText.text = 'Score: ' + o.l.score;
        baddieZ = baddiesZ.create(baddieX.x+150, baddieX.y+10, 'baddiesZ');
        baddieZ.body.gravity.y = 150;
        baddieZ.body.bounce.y = 0.3 + Math.random() * 0.2;
        baddieZ.body.collideWorldBounds = true;
      }
      function collectBaddieZ(player, baddieZ){
        baddieZ.kill();
        o.l.killZSound.play();

        o.l.score += 40;
        scoreText.text = 'Score: ' + o.l.score;
      }
      if (o.l.score === 600){
        game.state.start('winner');
      }

    },

    render: function(){
      game.debug.text('Time:' + game.time.events.duration/1000, 680, 16);
    },


  };
  return o;
})();

var winner = (function(){
  var o ={
    l : {},
    preload: function(){
      game.load.image('background', '/assets/winner.png');
      game.load.image('again', '/assets/play-again.png');

    },
    create: function(){
      game.add.sprite(0,0, 'background');
      var button = game.add.button(game.world.centerX-150, game.world.centerY+150, 'again', o.l.startGame);
      button.anchor.setTo(0.5);

    },
  };

  o.l.startGame = function(){
    game.state.start('level1');
  };

  return o;
})();


game.state.add('menu', menu);
game.state.add('level1', level1);
game.state.add('winner', winner);
game.state.start('menu');
