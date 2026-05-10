const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');
const passport = require('./lib/passport');
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const authRoutes = require('./routes/auth');
// const communityRoutes = require('./routes/communities');
// const activityRoutes = require('./routes/activities');

app.use('/api/auth', authRoutes);
// app.use('/api/communities', communityRoutes);
// app.use('/api/activities', activityRoutes);

app.get('/health', async (req, res) => {
  const userCount = await prisma.user.count();
  res.json({ status: 'ok', users: userCount });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});