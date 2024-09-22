console.log ("is this thing on?");
function calculateMotivation() {
    // Get values from input fields
    let R = parseInt(document.getElementById('relevancy').value) || 0;
    let S = parseInt(document.getElementById('specificity').value) || 0;
    let A1 = document.getElementById('attainability').checked;
    let A2 = parseInt(document.getElementById('actionability').value) || 0;
    let T1 = parseInt(document.getElementById('timeSpecificity').value) || 0;
    let T2 = parseInt(document.getElementById('timeSensitivity').value) || 0;
    let M = parseInt(document.getElementById('measurability').value) || 0;

    // ADHD mode
    let isAdhdMode = document.getElementById('adhdMode').checked;
    let N, C, U;
    if (isAdhdMode) {
        N = parseInt(document.getElementById('novelty').value) || 0;
        C = parseInt(document.getElementById('challenge').value) || 0;
        U = parseInt(document.getElementById('urgency').value) || 0;
    } else {
        N = C = U = 5; 
    }

    // Input Validation and Error/Warning Handling
    let errors = [];
    let warnings = [];

    if (R <= 0) errors.push("ERROR: Irrelevant goal. Redefine, reassess, or choose new goal.");
    if (S <= 0) errors.push("ERROR: Goal undefined. Define goal.");
    else if (S > 10) warnings.push("WARNING: Unnecessarily specific");
    if (A2 <= 0) errors.push("ERROR: You can't work on this in the foreseeable future. Find something else to do.");
    else if (A2 > 10) warnings.push("WARNING: You can't work on everything all the time");
    if (N <= 0) errors.push("ERROR: Novelty too low. Mix it up a bit.");
    else if (N > 10) warnings.push("WARNING: This probably isn't as original as you think it is.");
    if (C <= 0) errors.push("ERROR: Too easy.");
    if (T1 <= 0) errors.push("ERROR: It doesn't matter when you do this, so you'll never do it.");
    else if (T1 > 10) warnings.push("WARNING: That deadline's looking mighty harsh. Are you sure this is the right ammount of relevant?");
    if (U <= 0 || T1 <= 0) errors.push("ERROR: It doesn't matter when you do this, so you'll never do it."); 
    else if (U > 10) errors.push("ERROR: Too late.");
    if (M <= 0) errors.push("ERROR: But what counts as 'done', though?");
    else if (M > 10) warnings.push("WARNING: don't overanalyze it");

    if (!A1 || C > 10) errors.push("ERROR: Attainability is False or Challenge is too high");

    // Display errors or calculate and display result with warnings
    let resultDiv = document.getElementById('result');
    if (errors.length > 0) {
        resultDiv.textContent = errors.join('\n');
    } else {
        let motivation = R + S + (A1 ? 10 : 0) + A2 + T1 + T2 + M;
        if (isAdhdMode) {
            motivation += N + C + U; 
        }
        let resultText = `Motivation: ${motivation}`;
        if (warnings.length > 0) {
            resultText += "\n" + warnings.join('\n');
        }
        resultDiv.textContent = resultText;
    }
}
const categories = document.querySelectorAll('.category');

categories.forEach(category => {
    const label = category.querySelector('label');
    const definition = category.querySelector('.definition');

    // Create a span to wrap the label text
    const textSpan = document.createElement('span');
    textSpan.textContent = label.textContent;
    label.textContent = ''; // Clear the original text
    label.appendChild(textSpan);

    // Check if it's a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        label.addEventListener('click', () => {
            // Toggle visibility on click
            if (definition.style.opacity === '1') {
                definition.style.opacity = 0;
                definition.style.transform = 'translateY(-10px)';
                textSpan.style.backgroundColor = ''; // Reset background color
            } else {
                definition.style.opacity = 1;
                definition.style.transform = 'translateY(0)';
                textSpan.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Add highlight
            }
        });
    } else {
        // Hover behavior for non-touch devices
        label.addEventListener('mouseover', () => {
            definition.style.opacity = 1;
            definition.style.transform = 'translateY(0)';
            textSpan.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; 
        });

        label.addEventListener('mouseout', () => {
            definition.style.opacity = 0;
            definition.style.transform = 'translateY(-10px)';
            textSpan.style.backgroundColor = ''; 
        });
    }
});