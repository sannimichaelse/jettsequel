import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).header('Content-Type', 'text/html').send(`<h4>💊 <a href="https://jetti.io/">Jetti.io</a> Take Home Assignment</h4>`);
});

export default router;
