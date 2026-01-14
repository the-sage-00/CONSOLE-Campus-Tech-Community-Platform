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
      console.log("4d61646520427920416d6974", res.status);
    } catch (err) {
      console.error("❌ Ping failed:", err.message);
    }
  }, 10 * 60 * 1000); // every 10 minutes
}

export default keepAlive;