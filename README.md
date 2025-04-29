# Bubbles in the Desert is a Vanilla JavaScript video game.

You are a pink bubble floating in the desert. Your mission is to pop enemy cacti while avoiding being hit.

You have 5 lives, and every time a cactus touches you, you lose one bubble!
You move around the canvas using the arrow keys, and you shoot bubbles by pressing the spacebar.

To start or stop the game, press S.
To start a new game, press R.

Techniques Used
1. Vanilla JavaScript Sprite Animation
Use of ctx.drawImage() for moving player, enemies, tumbleweeds.

Functions: drawPlayer(), drawCacti(), drawTumbleweeds().

2. Parallax Background Effect
Tumbleweeds moving slowly across screen.

moveTumbleweeds() function.

Creates feeling of depth behind player action.

3. Enemy Movement Patterns
Cacti spawn at random x-positions.

Move steadily upward (moveCacti()).

Difficulty increases as more spawn over time.

4. Collision Animations (Simplified)
No full sprite sheet — sound effects simulate collisions.

detectCollisions() function handles:

Bullet hits cactus ➔ pop sound, +10 points.

Cactus hits player ➔ lose a life, sad sound.

5. Point & Shoot Mechanic
Arrows move the player.

Press Space to fire bubbles upward.

shootBubble() function creates bullets.

Simple "aim & fire" gameplay.

Video: https://go.screenpal.com/watch/cTfUqgnQX9y
