// Base de datos de preguntas por categoría
const questions = {
    historia: [
        {
            question: "¿En qué año cayó el Imperio Romano de Occidente?",
            options: ["476 d.C.", "300 d.C.", "600 d.C.", "1066 d.C."],
            correct: 0
        },
        {
            question: "¿Quién fue el primer presidente de los Estados Unidos?",
            options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "Alexander Hamilton"],
            correct: 1
        },
        {
            question: "¿En qué año terminó la Segunda Guerra Mundial?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "¿Cuál fue la antigua capital del Imperio Inca?",
            options: ["Machu Picchu", "Cusco", "Puno", "Arequipa"],
            correct: 1
        }
    ],
    geografia: [
        {
            question: "¿Cuál es la capital de Francia?",
            options: ["Lyon", "París", "Marsella", "Toulouse"],
            correct: 1
        },
        {
            question: "¿Cuál es el río más largo del mundo?",
            options: ["Amazonas", "Nilo", "Yangtze", "Misisipi"],
            correct: 1
        },
        {
            question: "¿Cuántos continentes hay?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "¿Cuál es la montaña más alta del mundo?",
            options: ["K2", "Mont Blanc", "Monte Everest", "Kilimanjaro"],
            correct: 2
        }
    ],
    ciencias: [
        {
            question: "¿Cuál es el símbolo químico del oro?",
            options: ["Au", "Ag", "Go", "Or"],
            correct: 0
        },
        {
            question: "¿Cuántos planetas hay en nuestro sistema solar?",
            options: ["8", "9", "10", "11"],
            correct: 0
        },
        {
            question: "¿Cuál es la velocidad de la luz?",
            options: ["300.000 km/s", "150.000 km/s", "500.000 km/s", "100.000 km/s"],
            correct: 0
        },
        {
            question: "¿Cuál es el órgano más grande del cuerpo humano?",
            options: ["Corazón", "Pulmón", "Piel", "Hígado"],
            correct: 2
        }
    ],
    arte: [
        {
            question: "¿Quién pintó la Mona Lisa?",
            options: ["Miguel Ángel", "Leonardo da Vinci", "Rafael", "Boticelli"],
            correct: 1
        },
        {
            question: "¿Cuántas orejas se cortó Van Gogh?",
            options: ["Una", "Dos", "Ninguna", "La mitad de una"],
            correct: 3
        },
        {
            question: "¿Quién esculpió el David?",
            options: ["Donatello", "Miguel Ángel", "Bernini", "Cellini"],
            correct: 1
        },
        {
            question: "¿Cuál es el museo más visitado del mundo?",
            options: ["Prado", "Louvre", "Uffizi", "Hermitage"],
            correct: 1
        }
    ],
    entretenimiento: [
        {
            question: "¿Cuántas películas de James Bond protagonizó Sean Connery?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "¿Quién cantó 'Bohemian Rhapsody'?",
            options: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
            correct: 1
        },
        {
            question: "¿En qué año se estrenó 'El Rey León'?",
            options: ["1992", "1993", "1994", "1995"],
            correct: 1
        },
        {
            question: "¿Cuál es el videojuego más vendido de todos los tiempos?",
            options: ["Tetris", "Mario Bros", "Minecraft", "Fortnite"],
            correct: 2
        }
    ],
    deportes: [
        {
            question: "¿Cuántos jugadores hay en un equipo de fútbol?",
            options: ["9", "10", "11", "12"],
            correct: 2
        },
        {
            question: "¿Cuántos anillos olímpicos hay?",
            options: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "¿En qué deporte se usa una raqueta y una red?",
            options: ["Bádminton", "Tenis", "Pádel", "Las tres opciones"],
            correct: 3
        },
        {
            question: "¿Cuánto pesa un balón de baloncesto?",
            options: ["400g", "500g", "600g", "700g"],
            correct: 2
        }
    ]
};

const categoryNames = {
    historia: 'Historia',
    geografia: 'Geografía',
    ciencias: 'Ciencias',
    arte: 'Arte',
    entretenimiento: 'Entretenimiento',
    deportes: 'Deportes'
};

const categoryEmojis = {
    historia: '📜',
    geografia: '🌍',
    ciencias: '🔬',
    arte: '🎨',
    entretenimiento: '🎬',
    deportes: '⚽'
};

const playerColors = [
    '#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#A78BFA', '#FF9F43'
];

let gameState = {
    players: [],
    currentPlayerIdx: 0,
    diceValue: 0,
    selectedCategory: null,
    gameStarted: false,
    isAnswering: false
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('setupModal').classList.add('show');
    updatePlayerInputs();
});

// Mostrar/ocultar modal de configuración
function toggleSetup() {
    const modal = document.getElementById('setupModal');
    modal.classList.toggle('show');
}

// Actualizar inputs de jugadores
function updatePlayerInputs() {
    const count = parseInt(document.getElementById('playerCount').value);
    const container = document.getElementById('playerInputs');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.style.marginBottom = '15px';
        div.innerHTML = `
            <label style="color: #6ec6d6; display: block; margin-bottom: 5px;">Jugador ${i + 1}:</label>
            <input type="text" id="player${i}Name" placeholder="Nombre" value="Jugador ${i + 1}" 
                   style="width: 100%; padding: 8px; border-radius: 6px; border: none; margin-bottom: 8px;">
            <input type="color" id="player${i}Color" value="${playerColors[i]}" 
                   style="width: 100%; height: 40px; border: none; border-radius: 6px; cursor: pointer;">
        `;
        container.appendChild(div);
    }
}

// Iniciar juego
function startGame() {
    const count = parseInt(document.getElementById('playerCount').value);
    gameState.players = [];

    for (let i = 0; i < count; i++) {
        const name = document.getElementById(`player${i}Name`).value || `Jugador ${i + 1}`;
        const color = document.getElementById(`player${i}Color`).value;
        gameState.players.push({
            id: i,
            name: name,
            color: color,
            position: 0,
            wedges: new Set(),
            points: 0
        });
    }

    gameState.currentPlayerIdx = 0;
    gameState.gameStarted = true;
    document.getElementById('setupModal').classList.remove('show');
    updateUI();
}

// Tirar dado
function rollDice() {
    if (gameState.isAnswering) return;

    gameState.diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById('rollBtn').disabled = true;

    // Animar dado
    const dice = document.getElementById('dice3d');
    dice.style.transform = `rotateX(${Math.random() * 720}deg) rotateY(${Math.random() * 720}deg) rotateZ(${Math.random() * 720}deg)`;

    setTimeout(() => {
        rotateDiceToValue(gameState.diceValue);
        document.getElementById('diceValue').textContent = gameState.diceValue;
        document.getElementById('rollBtn').disabled = false;
        movePlayer();
    }, 800);
}

// Rotar dado al valor correcto
function rotateDiceToValue(value) {
    const dice = document.getElementById('dice3d');
    const rotations = {
        1: 'rotateY(0deg) rotateX(0deg)',
        2: 'rotateY(180deg) rotateX(0deg)',
        3: 'rotateY(90deg) rotateX(0deg)',
        4: 'rotateY(-90deg) rotateX(0deg)',
        5: 'rotateX(90deg) rotateY(0deg)',
        6: 'rotateX(-90deg) rotateY(0deg)'
    };
    dice.style.transform = rotations[value];
}

// Mover jugador
function movePlayer() {
    const player = gameState.players[gameState.currentPlayerIdx];
    player.position = (player.position + gameState.diceValue) % 18;

    // Verificar si cayó en una casilla especial
    setTimeout(() => {
        checkPosition();
    }, 300);
}

// Verificar posición actual
function checkPosition() {
    const player = gameState.players[gameState.currentPlayerIdx];
    const square = document.querySelector(`[data-pos="${player.position + 1}"]`);

    if (square) {
        const category = square.getAttribute('data-category');
        gameState.selectedCategory = category;
        askQuestion(category);
    } else {
        nextTurn();
    }
}

// Hacer pregunta
function askQuestion(category) {
    gameState.isAnswering = true;
    const categoryQuestions = questions[category];
    const question = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];

    document.getElementById('categoryTitle').innerHTML = `${categoryEmojis[category]} ${categoryNames[category]}`;

    let html = `<div class="question-text">${question.question}</div>`;
    html += '<div class="answer-options">';

    question.options.forEach((option, idx) => {
        html += `<button class="answer-btn" onclick="answerQuestion(${idx}, ${question.correct}, '${category}')">
                    ${option}
                </button>`;
    });

    html += '</div>';
    document.getElementById('answerContent').innerHTML = html;
    document.getElementById('answerModal').classList.add('show');
}

// Responder pregunta
function answerQuestion(selected, correct, category) {
    const player = gameState.players[gameState.currentPlayerIdx];
    const isCorrect = selected === correct;

    // Deshabilitar todos los botones
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.includes(document.querySelectorAll('.answer-btn')[correct].textContent)) {
            btn.classList.add('correct');
        } else if (btn === event.target && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        player.wedges.add(category);
        player.points += 100;

        // Mostrar mensaje de éxito
        setTimeout(() => {
            showMessage(`¡Correcto! Ganaste el quesito de ${categoryNames[category]} 🥧`);
        }, 200);
    } else {
        player.points = Math.max(0, player.points - 50);
        setTimeout(() => {
            showMessage(`Incorrecto ❌ La respuesta correcta era la opción ${String.fromCharCode(65 + correct)}`);
        }, 200);
    }

    setTimeout(() => {
        closeAnswer();
        updateUI();
        nextTurn();
    }, 2000);
}

// Mostrar mensaje
function showMessage(msg) {
    const area = document.getElementById('questionArea');
    area.innerHTML = `<p style="color: #f1c40f; text-align: center; font-weight: bold;">${msg}</p>`;
}

// Cerrar modal de respuesta
function closeAnswer() {
    document.getElementById('answerModal').classList.remove('show');
}

// Siguiente turno
function nextTurn() {
    gameState.isAnswering = false;
    gameState.diceValue = 0;
    gameState.currentPlayerIdx = (gameState.currentPlayerIdx + 1) % gameState.players.length;
    document.getElementById('diceValue').textContent = '-';
    updateUI();
}

// Actualizar interfaz
function updateUI() {
    updatePlayersList();
    updateTurnInfo();
}

// Actualizar lista de jugadores
function updatePlayersList() {
    const container = document.getElementById('playersList');
    container.innerHTML = '';

    gameState.players.forEach((player, idx) => {
        const isActive = idx === gameState.currentPlayerIdx;
        const wedges = Array.from(player.wedges).map(w => '🥧').join('');

        const div = document.createElement('div');
        div.className = `player-item ${isActive ? 'active' : ''}`;
        div.innerHTML = `
            <div class="player-name">
                <div class="player-color-dot" style="background: ${player.color}"></div>
                <span>${player.name}</span>
            </div>
            <div class="player-wedges">
                <span class="wedge-icon">${wedges || '-'}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

// Actualizar info de turno
function updateTurnInfo() {
    const player = gameState.players[gameState.currentPlayerIdx];
    const html = `
        <p><strong>Jugador:</strong> ${player.name}</p>
        <p><strong>Quesitos:</strong> ${player.wedges.size}/6</p>
        <p><strong>Puntos:</strong> ${player.points}</p>
        <p style="margin-top: 10px; color: #f1c40f;">👉 ${player.name}, ¡tira el dado!</p>
    `;
    document.getElementById('turnInfo').innerHTML = html;
}

// Resetear juego
function resetGame() {
    gameState = {
        players: [],
        currentPlayerIdx: 0,
        diceValue: 0,
        selectedCategory: null,
        gameStarted: false,
        isAnswering: false
    };
    document.getElementById('setupModal').classList.add('show');
    updatePlayerInputs();
    document.getElementById('diceValue').textContent = '-';
    document.getElementById('questionArea').innerHTML = '<p style="color: #999; font-size: 0.9em;">Las preguntas aparecerán aquí</p>';
}
