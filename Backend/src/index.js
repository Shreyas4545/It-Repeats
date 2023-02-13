import 'dotenv';
import app from './app.js';

const PORT = process.env.PORT || 9000

app.listen(PORT, async () => {
    console.log(`Server up on port ${PORT}!`);
});

