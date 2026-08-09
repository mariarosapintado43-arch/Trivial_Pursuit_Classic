// Base de datos de preguntas por categoría (6 categorías)
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
    arte: 'Arte y Literatura',
    entretenimiento: 'Entretenimiento',
    deportes: 'Deportes y Pasatiempos'
};

const categoryEmojis = {
    historia: '📜',
    geografia: '🌍',
    ciencias: '🔬',
    arte: '🎨',
    entretenimiento: '🎬',
    deportes: '⚽'
};

const categoryColors = {
    historia: '#f1c40f',      // Amarillo
    entretenimiento: '#e91e63',  // Rosa
    ciencias: '#2ecc71',      // Verde
    deportes: '#e67e22',      // Naranja
    arte: '#8B4513',          // Marrón
    geografia: '#6ec6d6'      // Cyan
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
    isAnswering: false,
    isFinalQuestion: false
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
    player.position = (player.position + gameState.diceValue) % 24;

    // Verificar si cayó en una casilla especial
    setTimeout(() => {
        checkPosition();
    }, 300);
}

// Verificar posición actual
function checkPosition() {
    const player = gameState.players[gameState.currentPlayerIdx];
    
    // Buscar la casilla en la que cayó
    const squares = document.querySelectorAll('[data-type]');
    let landedSquare = null;
    
    // Encontrar la casilla correcta (usamos position para esto)
    const allSquares = Array.from(squares).filter(sq => sq.getAttribute('data-type') !== 'center');
    if (player.position < allSquares.length) {
        landedSquare = allSquares[player.position];
    }

    if (landedSquare) {
        const squareType = landedSquare.getAttribute('data-type');
        const category = landedSquare.getAttribute('data-category');

        if (squareType === 'retry') {
            // Casilla blanca "Tira otra vez"
            showMessage(`🎲 ¡Tira de nuevo! ${player.name} sacó un ${gameState.diceValue} y cayó en una casilla blanca.`);
            setTimeout(() => {
                gameState.diceValue = 0;
                document.getElementById('diceValue').textContent = '-';
                document.getElementById('rollBtn').disabled = false;
            }, 1500);
        } else if (squareType === 'hq' && category) {
            // Casilla HQ (especial con quesito)
            if (!player.wedges.has(category)) {
                gameState.selectedCategory = category;
                askQuestion(category, true);
            } else {
                showMessage(`Ya tienes el quesito de ${categoryNames[category]}. Pierde turno.`);
                setTimeout(() => nextTurn(), 1500);
            }
        } else if (squareType === 'normal' && category) {
            // Casilla normal
            gameState.selectedCategory = category;
            askQuestion(category, false);
        } else if (squareType === 'center') {
            // Centro - elegir categoría o pregunta final
            handleCenter();
        }
    } else {
        nextTurn();
    }
}

// Manejar casilla central
function handleCenter() {
    const player = gameState.players[gameState.currentPlayerIdx];
    
    if (player.wedges.size === 6) {
        // ¡Tiene todos los quesitos! Pregunta final
        gameState.isFinalQuestion = true;
        showMessage(`¡${player.name} llegó al centro con todos los quesitos! Responde la pregunta final para ganar.`);
        setTimeout(() => {
            chooseFinalCategory();
        }, 1500);
    } else {
        // Elegir categoría
        showMessage(`${player.name} llegó al centro. Elige una categoría.`);
        setTimeout(() => {
            chooseCategoryModal();
        }, 1500);
    }
}

// Elegir categoría en el centro
function chooseCategoryModal() {
    const categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.textContent = 'Elige una categoría';
    
    let html = '<div class="answer-options" style="gap: 15px;">';
    
    Object.keys(categoryNames).forEach(catKey => {
        html += `<button class="btn btn-secondary" style="margin: 0; background: ${categoryColors[catKey]};" 
                    onclick="selectCenterCategory('${catKey}')">
                    ${categoryEmojis[catKey]} ${categoryNames[catKey]}
                </button>`;
    });
    
    html += '</div>';
    document.getElementById('answerContent').innerHTML = html;
    document.getElementById('answerModal').classList.add('show');
}

// Seleccionar categoría en el centro
function selectCenterCategory(category) {
    document.getElementById('answerModal').classList.remove('show');
    gameState.selectedCategory = category;
    askQuestion(category, false);
}

// Elegir categoría para pregunta final
function chooseFinalCategory() {
    const categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.textContent = '¡PREGUNTA FINAL! Elige una categoría';
    categoryTitle.style.color = '#f39c12';
    
    let html = '<div class="answer-options" style="gap: 15px;">';
    
    Object.keys(categoryNames).forEach(catKey => {
        html += `<button class="btn btn-secondary" style="margin: 0; background: ${categoryColors[catKey]};" 
                    onclick="selectFinalCategory('${catKey}')">
                    ${categoryEmojis[catKey]} ${categoryNames[catKey]}
                </button>`;
    });
    
    html += '</div>';
    document.getElementById('answerContent').innerHTML = html;
    document.getElementById('answerModal').classList.add('show');
}

// Seleccionar categoría final
function selectFinalCategory(category) {
    document.getElementById('answerModal').classList.remove('show');
    gameState.selectedCategory = category;
    askQuestion(category, false, true);
}

// Hacer pregunta
function askQuestion(category, isHQ = false, isFinal = false) {
    gameState.isAnswering = true;
    const categoryQuestions = questions[category];
    const question = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];

    let title = `${categoryEmojis[category]} ${categoryNames[category]}`;
    if (isHQ) title += ' 🥧 (QUESITO)';
    if (isFinal) title += ' ⭐ (FINAL)';
    
    document.getElementById('categoryTitle').innerHTML = title;
    document.getElementById('categoryTitle').style.color = categoryColors[category];

    let html = `<div class="question-text">${question.question}</div>`;
    html += '<div class="answer-options">';

    question.options.forEach((option, idx) => {
        html += `<button class="answer-btn" onclick="answerQuestion(${idx}, ${question.correct}, '${category}', ${isHQ}, ${isFinal})">
                    ${option}
                </button>`;
    });

    html += '</div>';
    document.getElementById('answerContent').innerHTML = html;
    document.getElementById('answerModal').classList.add('show');
}

// Responder pregunta
function answerQuestion(selected, correct, category, isHQ = false, isFinal = false) {
    const player = gameState.players[gameState.currentPlayerIdx];
    const isCorrect = selected === correct;

    // Deshabilitar todos los botones
    document.querySelectorAll('.answer-btn').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correct) {
            btn.classList.add('correct');
        } else if (idx === selected && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        let message = `✅ ¡Correcto! `;
        
        if (isFinal) {
            message = `🎉 ¡${player.name} GANA LA PARTIDA! `;
            player.points += 500;
        } else if (isHQ) {
            message += `Ganaste el quesito de ${categoryNames[category]}! 🥧`;
            player.wedges.add(category);
            player.points += 100;
        } else {
            message += `+100 puntos`;
            player.points += 100;
        }

        showMessage(message);

        setTimeout(() => {
            closeAnswer();
            updateUI();
            
            if (isFinal) {
                // ¡GANADOR!
                setTimeout(() => {
                    showWinner(player.name);
                }, 1000);
            } else {
                nextTurn();
            }
        }, 2000);
    } else {
        let message = `❌ Incorrecto. `;
        
        if (isFinal) {
            message += `Intenta de nuevo en tu próximo turno.`;
        } else if (isHQ) {
            message += `Pierdes turno y el quesito de ${categoryNames[category]}.`;
        } else {
            message += `Pierdes turno.`;
        }

        player.points = Math.max(0, player.points - 25);
        showMessage(message);

        setTimeout(() => {
            closeAnswer();
            updateUI();
            nextTurn();
        }, 2000);
    }
}

// Mostrar ganador
function showWinner(playerName) {
    const winMessage = `<div style="text-align: center; padding: 20px;">
        <h1 style="color: #f1c40f; font-size: 2.5em; margin-bottom: 20px;">🏆 ¡${playerName} GANA! 🏆</h1>
        <p style="font-size: 1.2em; margin-bottom: 30px;">Consiguió todos los quesitos y acertó la pregunta final.</p>
        <button class="btn btn-primary" onclick="resetGame()" style="margin-top: 20px;">Jugar de Nuevo</button>
    </div>`;
    
    document.getElementById('answerContent').innerHTML = winMessage;
    document.getElementById('answerModal').classList.add('show');
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
    gameState.isFinalQuestion = false;
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
        const wedges = Array.from(player.wedges).map(() => '🥧').join('');

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
        isAnswering: false,
        isFinalQuestion: false
    };
    document.getElementById('setupModal').classList.add('show');
    updatePlayerInputs();
    document.getElementById('diceValue').textContent = '-';
    document.getElementById('questionArea').innerHTML = '<p style="color: #999; font-size: 0.9em;">Las preguntas aparecerán aquí</p>';
    document.getElementById('answerModal').classList.remove('show');
}
