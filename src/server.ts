import express from 'express';

const PORT = 5003;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
