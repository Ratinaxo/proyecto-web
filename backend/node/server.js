const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/node-to-flask', async (req, res) => {
	try {
		// Cambié la URL de Flask para usar una ruta válida ('/' o '/test')
		const response = await axios.get('http://localhost:5000/test');
		res.json({message: 'Respondiendo desde back node', flaskData: response.data});
	} catch (error) {
		res.status(500).json({error: 'Error en back Node al intentar conectar con Flask'});
	}
});

app.listen(PORT, () => {
	console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
});

