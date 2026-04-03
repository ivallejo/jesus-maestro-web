// Netlify Function — Guarda contenido en GitHub y dispara redeploy
// POST /api/guardar  { password, seccion, contenido }

const REPO_OWNER = 'ivallejo';
const REPO_NAME  = 'jesus-maestro-web';
const BRANCH     = 'main';

exports.handler = async (event) => {
  // Solo POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return error(400, 'JSON inválido'); }

  const { password, seccion, contenido } = body;

  // Verificar contraseña
  if (password !== process.env.ADMIN_PASSWORD) {
    return error(401, 'Contraseña incorrecta');
  }

  // Secciones válidas
  const secciones = ['contacto','hero','nosotros','faq','testimonios','documentos','galeria'];
  if (!secciones.includes(seccion)) {
    return error(400, 'Sección no válida');
  }

  const filePath = `content/${seccion}.json`;
  const token    = process.env.GITHUB_TOKEN;
  const apiBase  = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

  try {
    // 1. Obtener SHA actual del archivo
    const getRes = await fetch(apiBase, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });
    if (!getRes.ok) throw new Error(`GitHub GET ${getRes.status}`);
    const getJson = await getRes.json();
    const sha = getJson.sha;

    // 2. Codificar nuevo contenido en base64
    const newContent = Buffer.from(
      JSON.stringify(contenido, null, 2),
      'utf-8'
    ).toString('base64');

    // 3. Actualizar archivo en GitHub
    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `✏️ Actualización de ${seccion} desde el panel`,
        content: newContent,
        sha,
        branch: BRANCH,
      }),
    });
    if (!putRes.ok) {
      const err = await putRes.text();
      throw new Error(`GitHub PUT ${putRes.status}: ${err}`);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, seccion }),
    };

  } catch (e) {
    return error(500, e.message);
  }
};

function error(code, msg) {
  return {
    statusCode: code,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: false, error: msg }),
  };
}
