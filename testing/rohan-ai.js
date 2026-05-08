async function askRohanAI(userMessage) {
    // ⚠️ Siguraduhin na ito yung NEW URL galing sa "doPost" deployment mo
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyhI8cINtm12librwc2iyIRuPRq0dIjj8YcDWHEFuuevuOd3hiygYA_uL3-i-t7pvcD/exec'; 

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify({ message: userMessage }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            redirect: 'follow'
        });
        return await response.text();
    } catch (error) {
        return "System error: " + error.message;
    }
}