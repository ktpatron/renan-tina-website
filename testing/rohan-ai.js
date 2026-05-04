async function askRohanAI(userMessage) {
    // ⚠️ Siguraduhin na ito yung NEW URL galing sa "doPost" deployment mo
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzoBjtmF2e-HISSkNl9FmTiCPkCJBx16cgANnAcuKru5l5JYXKGiMxHI-YTTDvMAN1Q/exec'; 

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