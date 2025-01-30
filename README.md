# Game: Lone Hero SHB--The Last Stand Of Longbin Building
## Contributer
```
      ___           ___           ___           ___           ___           ___     
     /\  \         /\  \         /\  \         /\  \         /\  \         /\  \    
    /::\  \       /::\  \       /::\  \       /::\  \       /::\  \        \:\  \   
   /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \        \:\  \  
  /::\~\:\  \   /:/  \:\  \   /::\~\:\__\   /::\~\:\  \   /::\~\:\  \       /::\  \ 
 /:/\:\ \:\__\ /:/__/ \:\__\ /:/\:\ \:|__| /:/\:\ \:\__\ /:/\:\ \:\__\     /:/\:\__\
 \/_|::\/:/  / \:\  \ /:/  / \:\~\:\/:/  / \:\~\:\ \/__/ \/_|::\/:/  /    /:/  \/__/
    |:|::/  /   \:\  /:/  /   \:\ \::/  /   \:\ \:\__\      |:|::/  /    /:/  /     
    |:|\/__/     \:\/:/  /     \:\/:/  /     \:\ \/__/      |:|\/__/     \/__/      
    |:|  |        \::/  /       \::/__/       \:\__\        |:|  |                  
     \|__|         \/__/         ~~            \/__/         \|__|                  
```
   

## Description

A sniper-themed shooting game where players aim and shoot enemies using a sniper scope. The game includes several levels, with increasing difficulty as players progress. The objective is to kill a certain number of enemies in each level to move on to the next.

## Features

- **Sniper Scope**: A precision aiming system for shooting.
- **Enemy Movement**: Enemies move randomly on the screen.
- **Level Progression**: The game includes multiple levels with increasing difficulty.
- **Sound Effects**: Includes shooting, reloading, and get shot sounds for immersive experience.
- **Timer and Score**: The game keeps track of time and your score as you progress.
- **Background Music**: Enjoy relaxing background music as you play.
- **Responsive Interface**: Optimized for gameplay across different screen sizes.

## How to Play

1. **Start the Game**: Click the "Start" button to begin the game.
2. **Aim and Shoot**: Move the sniper scope and click to shoot enemies. If you click while the reload timer is active, a "Reloading" message will appear.
3. **Reloading**: After firing, you must wait for the reload sound to complete before firing again. You can see a "Reloading" message on the screen during this time.
4. **Killing Enemies**: When you hit an enemy, a "Get Shot" sound will play, and the enemy will be removed from the screen. You gain points for each enemy killed.
5. **Leveling Up**: After killing a certain number of enemies, you will progress to the next level with more enemies to defeat.
6. **Winning**: Keep killing enemies to reach the next level. The game will display a message saying "Level X Complete!" when you finish a level.

## Installation

### Prerequisites

To run this game, you need a web browser that supports HTML5 and JavaScript. You also need to have the following files available:

- `gameCanvas`: The canvas where the game is rendered.
- `src/image/enemy.png`: The image of the enemy.
- `src/image/background_1.png`: The background image.
- `src/music/reload.mp3`: Reload sound effect.
- `src/music/getshot.mp3`: Sound when an enemy is hit.
- `src/music/shoot.mp3`: Sound for shooting.
- `src/background_music1.mp3`: Background music.

### Running the Game

1. Clone or download the repository to your local machine.
2. Open the `index.html` file in your preferred web browser to play the game.

```bash
git clone https://github.com/your-repo/sniper-game.git
cd sniper-game
open index.html
```

3. Press "Begin" to begin the game.

## File Structure

```bash
sniper-game/
│
├── src/
│   ├── image/
│   │   ├── enemy.png
│   │   └── background_1.png
│   ├── music/
│   │   ├── shoot.mp3
│   │   ├── reload.mp3
│   │   ├── getshot.mp3
│   │   └── background_music1.mp3
│   ├── jingtou.js (sniper scope logic)
│   └── main.js (main game logic)
│
├── index.html
└── README.md
```

## Game Controls

- **Mouse**: Move your mouse to aim the sniper scope and click to shoot.
- **Reload Timer**: After shooting, wait for the reload sound to complete before shooting again.

## Credits

- **Art**: All images are custom or sourced from public domains.
- **Music**: Background music and sound effects are sourced from royalty-free libraries.

## License

This game is open-source and free to use. Feel free to modify and adapt it for personal use or contributions. Please refer to the `LICENSE` file for more information.

