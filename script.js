
function calculateFLAMES() {
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-message');
    const resultDiv = document.getElementById('result');
    
    // Reset previous results
    resultDiv.classList.remove('show');
    errorMsg.classList.remove('show');
    resetFlameLetters();
    
    // Validation
    if (!name1 || !name2) {
        errorMsg.classList.add('show');
        return;
    }
    
    if (name1 === name2) {
        showResult("You can't play FLAMES with yourself! 😄", 'result-friends');
        return;
    }
    
    // FLAMES algorithm
    let str1 = name1.replace(/\s/g, '');
    let str2 = name2.replace(/\s/g, '');
    
    // Remove common characters
    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            if (str1[i] === str2[j]) {
                str1 = str1.substring(0, i) + str1.substring(i + 1);
                str2 = str2.substring(0, j) + str2.substring(j + 1);
                i--;
                break;
            }
        }
    }
    
    const totalCount = str1.length + str2.length;
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let currentIndex = 0;
    
    // Elimination process
    while (flames.length > 1) {
        currentIndex = (currentIndex + totalCount - 1) % flames.length;
        flames.splice(currentIndex, 1);
        if (currentIndex >= flames.length) {
            currentIndex = 0;
        }
    }
    
    const result = flames[0];
    const resultMeaning = getResultMeaning(result);
    const resultClass = getResultClass(result);
    
    // Animate the winning letter
    setTimeout(() => {
        highlightFlamesLetter(result);
        showResult(resultMeaning, resultClass);
    }, 300);
}

function getResultMeaning(letter) {
    const meanings = {
        'F': `Friends 👫<br><small>You two are destined to be great friends!</small>`,
        'L': `Love 💖<br><small>There's true love between you two!</small>`,
        'A': `Affection 🥰<br><small>You share a special affectionate bond!</small>`,
        'M': `Marriage 💍<br><small>Wedding bells might be in your future!</small>`,
        'E': `Enemy 😤<br><small>You might not get along well...</small>`,
        'S': `Sibling 👨‍👩‍👧‍👦<br><small>You're like brother and sister!</small>`
    };
    return meanings[letter];
}

function getResultClass(letter) {
    const classes = {
        'F': 'result-friends',
        'L': 'result-love',
        'A': 'result-affection',
        'M': 'result-marriage',
        'E': 'result-enemy',
        'S': 'result-sibling'
    };
    return classes[letter];
}

function showResult(text, className) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = text;
    resultDiv.className = `show ${className}`;
}

function highlightFlamesLetter(letter) {
    const letters = ['F', 'L', 'A', 'M', 'E', 'S'];
    const index = letters.indexOf(letter);
    const flameLetters = document.querySelectorAll('.flame-letter');
    
    flameLetters[index].classList.add('active');
}

function resetFlameLetters() {
    document.querySelectorAll('.flame-letter').forEach(letter => {
        letter.classList.remove('active');
    });
}

// Allow Enter key to trigger calculation
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateFLAMES();
    }
});

// Add input validation and character filtering
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function(e) {
        // Only allow letters and spaces
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });
    
    input.addEventListener('focus', function() {
        document.getElementById('error-message').classList.remove('show');
    });
});
