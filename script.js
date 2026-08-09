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

// Estado del juego
let gameState = {
    players: [],
    currentPlayerIndex: 0,
    diceRoll: 0,
    selectedCategory: null,
    isAnswering: false
};

// Colores predefinidos para jugadores
const playerColors = [
    { name: 'Rojo', hex: '#FF6B6B', class: 'color-red' },
    { name: 'Azul', hex: '#4ECDC4', class: 'color-blue' },
    { name: 'Amarillo', hex: '#FFD93D', class: 'color-yellow' },
    { name: 'Verde', hex: '#6BCB77', class: 'color-green' },
    { name: 'Morado', hex: '#A78BFA', class: 'color-purple' },
    { name: 'Naranja', hex: '#FF9F43', class: 'color-orange' }
];

// Mapeo de categorías a colores
const categoryColors = {
    historia: '#FFD700',      // Amarillo
    geografia: '#87CEEB',     // Azul claro
    ciencias: '#90EE90',      // Verde
    arte: '#A78BFA',          // Morado
    entretenimiento: '#FFB6C1', // Rosa
    deportes: '#FFA500'       // Naranja
};

const categoryNames = {
    historia: 'Historia',
    geografia: 'Geografía',
    ciencias: 'Ciencias y Naturaleza',
    arte: 'Arte y Literatura',
    entretenimiento: 'Entretenimiento',
    deportes: 'Deportes y Pasatiempos'
};

// Inicialización
function initGame() {
    togglePlayerSetup();
}

// Mostrar/ocultar modal de configuración de jugadores
function togglePlayerSetup() {
    const modal = document.getElementById('setupModal');
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
    } else {
        modal.classList.add('show');
        updatePlayerInputs();
    }
}

// Actualizar inputs de jugadores según el número seleccionado
function updatePlayerInputs() {
    const count = parseInt(document.getElementById('playerCount').value);
    const container = document.getElementById('playerInputs');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'player-input-group';
        div.innerHTML = `
            <input type="text" id="player${i}Name" placeholder="Nombre del jugador ${i + 1}" value="Jugador ${i + 1}">
            <input type="color" id="player${i}Color" class="color-picker" value="${playerColors[i].hex}">
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
            position: 30,  // Centro del tablero
            wedges: new Set(),  // Quesitos por categoría
            isAtCenter: true
        });
    }

    gameState.currentPlayerIndex = 0;
    gameState.diceRoll = 0;

    // Cerrar modal y iniciar
    document.getElementById('setupModal').classList.remove('show');
    updateUI();
    renderBoard();
}

// Tirar dado
function rollDice() {
    if (gameState.isAnswering) return;

    gameState.diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').innerHTML = `🎲 ${gameState.diceRoll}`;

    // Mostrar animación
    document.getElementById('diceBtn').disabled = true;
    setTimeout(() => {
        movePlayer(gameState.diceRoll);
        document.getElementById('diceBtn').disabled = false;
    }, 1000);
}

// Mover jugador
function movePlayer(steps) {
    const player = gameState.players[gameState.currentPlayerIndex];
    player.position = (player.position + steps) % 30;
    player.isAtCenter = player.position === 30;

    renderBoard();

    // Verificar en qué casilla cayó
    setTimeout(() => {
        checkLanding();
    }, 500);
}

// Verificar dónde cayó el jugador
function checkLanding() {
    const player = gameState.players[gameState.currentPlayerIndex];
    
    if (player.position === 30) {
        // Centro del tablero
        showMessage('¡Llegaste al centro! Elige una categoría para tu pregunta.');
        showCategorySelector();
    } else {
        // Obtener la categoría de la casilla
        const landingSquare = document.querySelector(`[data-pos="${player.position}"]`);
        if (landingSquare) {
            const category = landingSquare.getAttribute('data-category');
            gameState.selectedCategory = category;
            askQuestion(category);
        }
    }
}

// Mostrar selector de categoría
function showCategorySelector() {
    const player = gameState.players[gameState.currentPlayerIndex];
    const categories = Object.keys(categoryNames);
    
    let html = `
        <div class="question-modal">
            <h2>Elige una categoría</h2>
            <div class="answer-options">
    `;

    categories.forEach(cat => {
        html += `
            <button class="answer-btn" onclick="selectCategory('${cat}')">
                ${categoryNames[cat]}
            </button>
        `;
    });

    html += `</div></div>`;
    document.getElementById('answerContent').innerHTML = html;
    document.getElementById('answerModal').classList.add('show');
}

// Seleccionar categoría
function selectCategory(category) {
    gameState.selectedCategory = category;
    document.getElementById('answerModal').classList.remove('show');
    askQuestion(category);
}

// Hacer pregunta
function askQuestion(category) {
    const categoryQuestions = questions[category];
    const question = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    
    gameState.isAnswering = true;

    const player = gameState.players[gameState.currentPlayerIndex];
    const categoryName = categoryNames[category];
    const categoryColor = categoryColors[category];

    let html = `
        <div class="question-modal">
            <div class="category-badge" style="background: ${categoryColor}">
                ${categoryName}
            </div>
            <h2>Pregunta</h2>
            <p class="question-text">${question.question}</p>
            <div class="answer-options">
    `;

    question.options.forEach((option, index) => {
        html += `
            <button class="answer-btn" onclick="submitAnswer(${index}, ${question.correct})">
                ${option}
            </button>
        `;
    });

    html += `</div></div>`;
    document.getElementById('answerContent').innerHTML = html;
    document.getElementById('answerModal').classList.add('show');
}

// Enviar respuesta
function submitAnswer(selected, correct) {
    const player = gameState.players[gameState.currentPlayerIndex];
    const category = gameState.selectedCategory;
    const isCorrect = selected === correct;

    let resultHTML = `<div class="question-modal">`;

    if (isCorrect) {
        resultHTML += `
            <h2 style="color: #51cf66;">¡Correcto! 🎉</h2>
            <p>Ganaste un quesito de ${categoryNames[category]}</p>
        `;
        player.wedges.add(category);

        // Verificar si ganó
        if (player.wedges.size === 6) {
            resultHTML += `
                <h3 style="color: #667eea; margin-top: 20px;">¡Ahora ve al centro para la pregunta final!</h3>
            `;
        }
    } else {
        resultHTML += `
            <h2 style="color: #ff6b6b;">Incorrecto ❌</h2>
            <p>Lo siento, esa no es la respuesta correcta.</p>
        `;
    }

    resultHTML += `
        <button class="btn btn-primary mt-20" onclick="nextTurn()">Siguiente turno</button>
    </div>
    `;

    document.getElementById('answerContent').innerHTML = resultHTML;
}

// Siguiente turno
function nextTurn() {
    gameState.isAnswering = false;
    gameState.diceRoll = 0;
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    
    closeAnswerModal();
    updateUI();
    renderBoard();
}

// Cerrar modal de respuesta
function closeAnswerModal() {
    document.getElementById('answerModal').classList.remove('show');
}

// Mostrar mensaje
function showMessage(msg) {
    // Implementar si es necesario
}

// Actualizar interfaz
function updateUI() {
    updatePlayersList();
    updateTurnDisplay();
    updateQuestionArea();
}

// Actualizar lista de jugadores
function updatePlayersList() {
    const container = document.getElementById('playersList');
    container.innerHTML = '';

    gameState.players.forEach((player, index) => {
        const isActive = index === gameState.currentPlayerIndex;
        const wedgeIcons = Array.from(player.wedges).map(w => '🥧').join('');
        
        const div = document.createElement('div');
        div.className = `player-item ${isActive ? 'active' : ''}`;
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="player-color-indicator" style="background: ${player.color}"></div>
                <span>${player.name}</span>
            </div>
            <div class="player-wedges">${wedgeIcons}</div>
        `;
        container.appendChild(div);
    });
}

// Actualizar display de turno
function updateTurnDisplay() {
    const player = gameState.players[gameState.currentPlayerIndex];
    const html = `
        <p><strong>Jugador:</strong> ${player.name}</p>
        <p><strong>Quesitos:</strong> ${player.wedges.size}/6</p>
        <p><strong>Posición:</strong> ${player.position === 30 ? 'Centro' : `Casilla ${player.position}`}</p>
    `;
    document.getElementById('currentTurn').innerHTML = html;
}

// Actualizar área de preguntas
function updateQuestionArea() {
    const html = `
        <p>Presiona el botón para tirar el dado y comenzar tu turno.</p>
    `;
    document.getElementById('questionArea').innerHTML = html;
}

// Renderizar tablero (fichas de jugadores)
function renderBoard() {
    const container = document.getElementById('piecesContainer');
    container.innerHTML = '';

    const positions = {
        30: { x: 300, y: 300 }  // Centro
    };

    // Calcular posiciones de otras casillas (aproximado)
    for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 140;
        positions[i] = {
            x: 300 + Math.cos(angle) * radius,
            y: 300 + Math.sin(angle) * radius
        };
    }

    gameState.players.forEach((player, index) => {
        const pos = positions[player.position];
        const piece = document.createElement('div');
        piece.className = 'player-piece';
        piece.style.left = (pos.x - 15) + 'px';
        piece.style.top = (pos.y - 15) + 'px';
        piece.style.background = player.color;
        piece.textContent = index + 1;
        piece.title = player.name;
        
        container.appendChild(piece);
    });
}

// Resetear juego
function resetGame() {
    gameState = {
        players: [],
        currentPlayerIndex: 0,
        diceRoll: 0,
        selectedCategory: null,
        isAnswering: false
    };
    
    document.getElementById('diceResult').innerHTML = '';
    document.getElementById('answerModal').classList.remove('show');
    document.getElementById('setupModal').classList.add('show');
    updatePlayerInputs();
    renderBoard();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Abrir modal de configuración al cargar
    setTimeout(() => {
        document.getElementById('setupModal').classList.add('show');
        updatePlayerInputs();
    }, 500);
});

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const setupModal = document.getElementById('setupModal');
    const answerModal = document.getElementById('answerModal');
    
    if (event.target === setupModal) {
        setupModal.classList.remove('show');
    }
    if (event.target === answerModal) {
        answerModal.classList.remove('show');
    }
};
