const faceColour = document.getElementById('face-colour');
const borderColour = document.getElementById('border-colour');
const lineColour = document.getElementById('line-colour');
const hourColour = document.getElementById('hour-colour');
const minuteColour = document.getElementById('minute-colour');
const secondColour = document.getElementById('second-colour');
const dialColour = document.getElementById('dial-colour');
const canvas = document.getElementById('canvas');

function clock() {
    const now = new Date();
    const ctx = canvas.getContext('2d');

    // Setup canvas

    ctx.save(); // save the default state
    ctx.clearRect(0, 0, 500, 500);
    ctx.translate(250, 250); // puts clock in the middle
    ctx.rotate(-Math.PI / 2); // rotate clock's hands

    // Set default styles

    ctx.strokestyle = '#000000';
    ctx.fillStyle = '#f4f4f4';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // Draw clock face

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = borderColour.value;
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.fillStyle = faceColour.value;
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    

    // Draw hour marks

    ctx.save();
    ctx.strokeStyle = lineColour.value;
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();

    // Draw minute marks

    ctx.save();
    ctx.strokeStyle = lineColour.value;
    ctx.lineWidth = 3;
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0){
        ctx.beginPath();
        ctx.moveTo(118, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    // Get current time

    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // Draw hour hand

    ctx.save();
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.strokeStyle = hourColour.value;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // Draw minute hand

    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800 * sec));
    ctx.strokeStyle = minuteColour.value;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(118, 0);
    ctx.stroke();
    ctx.restore();

    // Draw second hand

    ctx.save();
    ctx.rotate((Math.PI / 30) * sec);
    ctx.strokeStyle = secondColour.value;;
    ctx.fillStyle = dialColour.value;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.restore();
    
    requestAnimationFrame(clock);

    };

    requestAnimationFrame(clock);

     document.getElementById('save-btn').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'clock.png';
        link.href = dataURL;
        link.click();
    }); 