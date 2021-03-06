function Player(game, key){
	//call to Phaser.Sprite // new Sprite(game, x, y, frame)
	Phaser.Sprite.call(this, game, 17400,game.world.height-75,key);

	// add properties
	this.anchor.set(0.5);
	game.physics.enable(this);
	this.enableBody = true;
	this.body.collideWorldBounds = true;
	this.body.bounce.y = 0.2;
    this.body.gravity.y = 800;
    this.body.acceleration.x = 0;
    this.animations.add('walk',[0, 1, 3, 2, 1, 3],10, true);
    this.animations.add('newWalk',[5, 6 ,8 ,7 ,6 ,8],8, true);
    this.animations.add('wandHit',[11],6, true);
	this.animations.add('idle', ['nouv02'], 30, false);
	this.animations.add('newIdle', ['pinknouv02'], 30, false);
	this.body.setSize(30, 110, 60, 25);
	this.animations.add('jumping',[4],10, false);
	this.animations.add('newJumping',[9],10, false);
	this.movingRight  = true;
	this.shootButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
	this.shootButton.onDown.add(this.oneHeart, this);
	game.time.events.loop(Phaser.Timer.SECOND*3, this.takeDamage, this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
	this.body.velocity.x = 0;
    if(!wandAttack){
		if (game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down && hitPlatform || hitObstaclePlayer && game.input.keyboard.isDown(Phaser.Keyboard.W) 
			&& this.body.touching.down ||  attacked && game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down || attackedFear && game.input.keyboard.isDown(Phaser.Keyboard.W)
			&& this.body.touching.down){
			//makes player go up
            this.body.velocity.y = -300; 
            jump.play('', 0, 0.25, false);        
    	}
	}else if(wandAttack){
		if(game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down && hitPlatform || hitObstaclePlayer && game.input.keyboard.isDown(Phaser.Keyboard.W) 
			&& this.body.touching.down ||  attacked && game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down || attackedFear && game.input.keyboard.isDown(Phaser.Keyboard.W)
			&& this.body.touching.down){
			//makes player go up
            this.body.velocity.y = -420; 
            jump.play('', 0, 0.25, false);        
    	}
	}
	if(!wandAttack){
	//if right key is pressed, player runs to the right"
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.movingRight = true;
		this.body.velocity.x = 105;
		this.scale.x = 1;
		this.animations.play('walk');
		//else player runs to the left
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.movingRight = false;
		this.body.velocity.x = -105;
		this.scale.x = -1;
		this.animations.play('walk');
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
       if(wandAttack){
			this.animations.play('wandHit');
			wandAttackSound.play('', 0, 0.25, false);
		}
    } else {
		this.animations.play('idle');
	}	

	if (!this.body.touching.down){
    	this.animations.play('jumping');
    }
		//if player pressed up player jump
	}

	if(wandAttack){
	//if right key is pressed, player runs to the right"
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.movingRight = true;
		this.body.velocity.x = 105;
		this.scale.x = 1;
		this.animations.play('newWalk');
		//else player runs to the left
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.movingRight = false;
		this.body.velocity.x = -105;
		this.scale.x = -1;
		this.animations.play('newWalk');
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
       if(wandAttack){
			this.animations.play('wandHit');
			wandAttackSound.play('', 0, 0.25, false);
		}
    } else {
		this.animations.play('newIdle');
	}	

	if (!this.body.touching.down){
    	this.animations.play('newJumping');
    }
		//if player pressed up player jump
	}

}

Player.prototype.oneHeart = function(){
	if(wandAttack){
		this.animations.play('wandHit');
		heart = new Heart(game,'heart');
    	hearticles.add(heart);
    	wandAttackSound.play('', 0, 0.25, false);
	}
}

Player.prototype.takeDamage = function(){
			if(attackedFlame){
			console.log("taking damage");
			wall.play('', 0, 0.25, false);
			counter++;
			if(counter == 1){
				//console.log("1 health")
				healthBar.animations.play("one");
			}else if(counter ==2){
				//console.log("2 health");
				healthBar.animations.play("two");		
			}else if(counter ==3){
				//console.log("3 health");
				healthBar.animations.play("three");	
			}else if(counter ==4){
				//console.log("4 health");
				healthBar.animations.play("four");	
			}else if(counter ==5){
				//console.log("5 health");
				healthBar.animations.play("five");	
			}else if(counter ==6){
				//console.log("6 health");
				healthBar.animations.play("six");	
			}else if(counter ==7){
				//console.log("7 health");
				healthBar.animations.play("seven");	
			
			}	
		}
}
