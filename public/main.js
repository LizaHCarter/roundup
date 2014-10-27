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
  var platforms, player, baddiesX;
  var o = {
    l :{},

    preload: function(){
      game.load.image('background', '/assets/sky.png');
      game.load.image('start', '/assets/star.png');
      game.load.image('ground', '/assets/platform.png');
      game.load.spritesheet('fighter', '/assets/fighter.png', 50, 50); //Kayla enter info here
    },
    create: function(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
      // Ledges
      platforms = game.add.group();
      platforms.enableBody = true;

      var ground = platforms.create(0, game.world.height -64, 'ground');
      ground.scale.setTo(2, 2);
      ground.body.immovable = true;

      var ledge = platforms.create(-50, 400, 'ground');
      ledge.body.immovable = true;

      var ledge = platforms.create(500, 400, 'ground');
      ledge.body.immovable = true;


      var ledge = platforms.create(-150, 250, 'ground');
      ledge.body.immovable = true;


      var ledge2 = platforms.create(200, 75, 'ground');
      ledge2.scale.setTo(0.2, 2);
      ledge2.body.immovable = true;

      var ledge3 = platforms.create(400, 150, 'ground');
      ledge3.scale.setTo(0.4, 1.5);
      ledge3.body.immovable = true;

      var ledge4 = platforms.create(600, 50, 'ground');
      ledge4.scale.setTo(0.3, 2.5);
      ledge4.body.immovable = true;


      //Fighter
      player = game.add.sprite(game.world.centerX, game.world.height - 150, 'fighter');
      game.physics.arcade.enable(player);

      player.body.bounce.y = 0.2;
      player.body.gravity.y = 300;
      player.body.collideWorldBounds = true;

      /*player.animations.add('left', [], 10, true); //Kayla
      player.animations.add('right', [], 10, true); //Kayla*/
      cursors = game.input.keyboard.createCursorKeys();

      scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
      scoreText = game.add.text(680, 16, 'timer: 30', { fontSize: '32px', fill: '#ffffff' });

      baddiesX = game.add.group();
      baddiesX.enableBody = true;

      for(var i = 0; i < 2; i++){
        var baddieX1 = baddiesX.create(i*310, 0, 'baddiesX1');
        baddieX1.body.gravity.y = 6;
        baddieX1.body.bounce.y = 0.3 + Math.random() * 0.2;
      }
      for(var i = 0; i < 2; i++){
        var baddieX2 = baddiesX.create((i+0.8)*200, 0, 'baddiesX2');
        baddieX2.body.gravity.y = 6;
        baddieX2.body.bounce.y = 0.3 + Math.random() * 0.2;
      }
      for(var i = 0; i < 2; i++){
        var baddieX3 = baddiesX.create((i+0.9) *275, 0, 'baddiesX3');
        baddieX3.body.gravity.y = 6;
        baddieX3.body.bounce.y = 0.3 + Math.random() * 0.2;
      }
      for(var i = 0; i < 2; i++){
        var baddieX4 = baddiesX.create((i+1)*380, 0, 'baddiesX4');
        baddieX4.body.gravity.y = 6;
        baddieX4.body.bounce.y = 0.3 + Math.random() * 0.2;
      }
      for(var i = 0; i < 2; i++){
        var baddieX5 = baddiesX.create((i+1.2)*312, 0, 'baddiesX5');
        baddieX5.body.gravity.y = 6;
        baddieX5.body.bounce.y = 0.3 + Math.random() * 0.2;
      }


    },
    update: function(){
      game.physics.arcade.collide(player, platforms);
      game.physics.arcade.collide(baddiesX, platforms);
    },
  };
  return o;
})();

game.state.add('menu', menu);
game.state.add('level1', level1);
game.state.start('menu');
