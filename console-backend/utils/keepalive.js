import fetch from 'node-fetch';

function keepAlive() {
  const url = process.env.BACKEND_URL;

  if (!url) {
    console.error("❌ BACKEND_URL is not defined in .env");
    return;
  }

  setInterval(async () => {
    try {
      const res = await fetch(`${url}/ping`);
      if (res.ok) {
        console.log("✅ Keep-alive ping successful");
      } else {
        console.log("⚠️ Keep-alive ping returned:", res.status);
      }
    } catch (err) {
      console.error("❌ Keep-alive ping failed:", err.message);
    }
  }, 10 * 60 * 1000); // every 10 minutes
}

export default keepAlive;
