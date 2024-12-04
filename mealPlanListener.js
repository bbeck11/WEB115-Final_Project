
document.getElementById("submit").addEventListener('click', myWindow);
document.getElementById("clear").addEventListener('click', clearPlanner);
document.getElementById("download").addEventListener('click', downloadPlanner);

// Listener for toggle funtion is out of scope for school project
// document.getElementById("toggleSaturday").addEventListener('click', function() {
//     toggleMealDays('saturday'); 
// });
// document.getElementById("toggleSunday").addEventListener('click', function() {
//     toggleMealDays('sunday'); 
// });

// Lines 15-68: function retrives form values and generates meal plan calendar
function getMealPlanContent() {
    const name = document.getElementById('name').value;
    const goal = document.getElementById('goal').value;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let mealPlanContent = `
        <html>
        <head>
            <title>Meal Plan</title>
            <style>
                body { font-family: monospace; }
                tr { padding-top: 10px; margin: 5px;}
                td { padding: 10px; margin: 5px; border: 1px solid black; border-collapse: collapse;
                    word-wrap: break-word;}
            </style>
        </head>
        <body>
            <h1>Meal Plan for ${name}</h1>
            <p>Goal for the week: ${goal}</p>
            <table>
                <tr>
                <td><h2>Monday</h2></td><td><h2>Tuesday</h2></td><td><h2>Wednesday</h2></td>
                <td><h2>Thursday</h2></td><td><h2>Friday</h2></td><td><h2>Saturday</h2></td><td><h2>Sunday</h2></td>
                </tr>
                <tr>
    `;

    days.forEach(day => {
        const breakfast = document.getElementById(`${day.toLowerCase()}Breakfast`).value;
        const snack1 = document.getElementById(`${day.toLowerCase()}Snack`).value;
        const lunch = document.getElementById(`${day.toLowerCase()}Lunch`).value;
        const snack2 = document.getElementById(`${day.toLowerCase()}Snack2`).value;
        const dinner = document.getElementById(`${day.toLowerCase()}Dinner`).value;

        mealPlanContent += `
            <td>
            <p><b>Breakfast:</b> ${breakfast}</p>
            <p><b>Snack:</b> ${snack1}</p>
            <p><b>Lunch:</b> ${lunch}</p>
            <p><b>Snack:</b> ${snack2}</p>
            <p><b>Dinner:</b> ${dinner}</p>
            </td>
        `;
    });

    mealPlanContent += `
            </tr>
        </table>
        </body>
        </html>
    `;

    return mealPlanContent;
}

function myWindow() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    const mealPlanContent = getMealPlanContent();
    const mealPlanWindow = window.open('about:blank', 'myPop', 'width=900,height=700,left=200,top=200');
    mealPlanWindow.document.write(mealPlanContent);
    mealPlanWindow.document.close();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function clearPlanner() {
    document.getElementById('myForm').reset();
}

function downloadPlanner() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    const mealPlanContent = getMealPlanContent();
    const downloadPlan = new Blob([mealPlanContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(downloadPlan);
    link.download = 'mealPlan.html';
    link.click();
}

// Toggle function is out of scope
// function toggleMealDays(day) {
//     let dayElement = document.getElementById(day+"Form");
//     if (dayElement.style.display === 'none') {
//         dayElement.style.display = 'block';
//     } else {
//         dayElement.style.display = 'none';
//     }
// }