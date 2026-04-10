<template>
  <div class="team-intro">
    <h1>Our Team</h1>
    <div class="team-leader">
      <h2>Leader</h2>
      <p>{{ leader.name }}</p>
    </div>
    <div class="team-members">
      <h2>Members</h2>
      <ul>
        <li v-for="member in members" :key="member.name">{{ member.name }}</li>
      </ul>
    </div>
    <div class="games">
      <h2>Games We Build</h2>
      <ul>
        <li v-for="game in games" :key="game.name">
          <h3>{{ game.name }}</h3>
          <p>{{ game.description }}</p>
          <p>{{ game.rules }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leader: {
        name: "Xiangze Xue"
      },
      members: [
        { name: "Qiming Qu" },
        { name: "Ruichao Xia" },
        { name: "Zhe He" },
        { name: "Qi Zhu" },
        { name: "Jiamu Zhang" }
      ],
      games: [
        {
          name: "2048",
          description: "2048 is a simple and addictive number merging game where blocks of the same number are merged by sliding them to reach 2048.",
          rules: "Game Rules: Use the arrow keys to slide the tiles. When two tiles with the same number touch, they merge into one. The goal is to create a tile with the number 2048."
        },
        {
          name: "Gluttonous Snake",
          description: "Snake is a classic casual game that controls a snake to eat food on the screen, making the snake grow longer and longer while avoiding bumping into walls and itself.",
          rules: "Game Rules: Use the arrow keys to control the direction of the snake. Eat the food that appears on the screen to grow longer. Avoid running into the walls or the snake's own body, as this will end the game."
        },
        {
          name: "Gomoku",
          description: "Gomoku is a strategy board game in which players take turns placing black and white pieces on the board, and the first player to line up five pieces wins.",
          rules: "Game Rules: Players take turns placing a stone of their color (black or white) on an empty intersection of the board. The first player to get an unbroken row of five stones horizontally, vertically, or diagonally wins the game."
        }
      ]
    };
  }
}
</script>

<style scoped>
.team-intro {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  color: #3498db;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

h3 {
  color: #e74c3c;
  margin-bottom: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  background: #ffffff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.team-leader,
.team-members,
.games {
  margin-bottom: 20px;
}

.team-leader p,
.team-members ul,
.games ul {
  background: #ecf0f1;
  padding: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
}

.team-leader p {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.team-members ul li,
.games ul li {
  font-size: 16px;
}

.games ul li h3 {
  font-size: 18px;
  margin: 0;
}

.games ul li p {
  font-size: 14px;
  color: #7f8c8d;
}
</style>
