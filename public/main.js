var game = new Phaser.Game(800, 600, Phaser.AUTO, 'roundup');

var menu = (function(){
  var o ={
    l : {},
    preload: function(){
      game.load.image('background', '/assets/sky.png');
      game.load.image('start', '/assets/star.png');

    },
    create: function(){
      game.add.sprite(0,0, 'background');

      var button = game.add.button(game.world.centerX, game.world.centerY, 'start', o.l.startGame);
      button.anchor.setTo(0.5);
      button.scale.setTo(0.5);

      var text = game.add.text(game.world.centerX, game.world.centerY - button.height, 'RoundUp');
      text.anchor.setTo(0.5);
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
      game.load.image('background', '/assets/sky.png');
      game.load.image('start', '/assets/star.png');
      game.load.image('ground', '/assets/platform.png');
      game.load.image('baddiesZ', '/assets/star.png');//baddieZ img KAYLA
      game.load.spritesheet('fighter', '/assets/ninja-girl.png', 62, 78);
      game.load.audio('song', '/assets/background.mp3');
      //game.load.audio('song', '/assets/music.mp3');
      o.l.song = game.add.audio('song');
      o.l.song.loop = true;
      o.l.song.play();
    },
    create: function(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
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


      for(var i = 0; i < 2; i++){
        var baddieX1 = baddiesX.create(i*310, 0, 'baddiesX1');
        baddieX1.body.gravity.y = 150;
        baddieX1.body.bounce.y = 0.3 + Math.random() * 0.2;
        baddieX1.body.collideWorldBounds = true;
      }
      for(var i = 0; i < 2; i++){
        var baddieX2 = baddiesX.create((i+0.8)*200, 0, 'baddiesX2');
        baddieX2.body.gravity.y = 150;
        baddieX2.body.bounce.y = 0.3 + Math.random() * 0.2;
        baddieX2.body.collideWorldBounds = true;
      }
      for(var i = 0; i < 2; i++){
        var baddieX3 = baddiesX.create((i+0.9) *275, 0, 'baddiesX3');
        baddieX3.body.gravity.y = 150;
        baddieX3.body.bounce.y = 0.3 + Math.random() * 0.2;
        baddieX3.body.collideWorldBounds = true;
      }
      for(var i = 0; i < 2; i++){
        var baddieX4 = baddiesX.create((i+1)*380, 0, 'baddiesX4');
        baddieX4.body.gravity.y = 150;
        baddieX4.body.bounce.y = 0.3 + Math.random() * 0.2;
        baddieX4.body.collideWorldBounds = true;
      }
      for(var i = 0; i < 2; i++){
        var baddieX5 = baddiesX.create((i+1.2)*312, 0, 'baddiesX5');
        baddieX5.body.gravity.y = 150;
        baddieX5.body.bounce.y = 0.3 + Math.random() * 0.2;
        baddieX5.body.collideWorldBounds = true;
      }

      game.time.events.add(Phaser.Timer.SECOND * 30, gameOver, this);

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
      }

      function collectBaddieX(player, baddieX){
        baddieX.kill();

        o.l.score += 20;
        scoreText.text = 'Score: ' + o.l.score;
        baddieZ = baddiesZ.create(baddieX.x, baddieX.y-60, 'baddiesZ');
        baddieZ.body.gravity.y = 150;
        baddieZ.body.bounce.y = 0.3 + Math.random() * 0.2;
        baddieZ.body.collideWorldBounds = true;
      }
      function collectBaddieZ(player, baddieZ){
        baddieZ.kill();

        o.l.score += 40;
        scoreText.text = 'Score: ' + o.l.score;
      }

    },

    render: function(){
      game.debug.text('Time:' + game.time.events.duration/1000, 680, 16);
    },


  };
  return o;
})();

game.state.add('menu', menu);
game.state.add('level1', level1);
game.state.start('menu');
