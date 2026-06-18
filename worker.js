const GITHUB_REPO = 'Banditducman/nicholascarophotography.co.uk';
const FILE_PATH   = 'NCPhoto contact requests.txt';

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return cors(new Response(null, { status: 204 }));
    }

    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/notify') {
      try {
        const { email } = await request.json();
        if (!email || !email.includes('@')) {
          return cors(new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 }));
        }

        const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents/${encodeURIComponent(FILE_PATH)}`;
        const headers = {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'NicholasCaro-Worker',
          'Content-Type': 'application/json',
        };

        // Get current file
        const getRes = await fetch(apiBase, { headers });
        const getData = await getRes.json();

        const existing = getRes.ok ? atob(getData.content.replace(/\n/g, '')) : '';
        const updated  = existing.trimEnd() + '\n' + email + '\n';

        // Write updated file
        const putBody = {
          message: `Add contact request: ${email}`,
          content: btoa(updated),
          ...(getRes.ok ? { sha: getData.sha } : {}),
        };

        const putRes = await fetch(apiBase, {
          method: 'PUT',
          headers,
          body: JSON.stringify(putBody),
        });

        if (!putRes.ok) {
          const err = await putRes.json();
          return cors(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
        }

        return cors(new Response(JSON.stringify({ ok: true }), { status: 200 }));

      } catch (e) {
        return cors(new Response(JSON.stringify({ error: e.message }), { status: 500 }));
      }
    }

    return env.ASSETS.fetch(request);
  }
};

function cors(response) {
  const r = new Response(response.body, response);
  r.headers.set('Access-Control-Allow-Origin', '*');
  r.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  r.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  r.headers.set('Content-Type', 'application/json');
  return r;
}
