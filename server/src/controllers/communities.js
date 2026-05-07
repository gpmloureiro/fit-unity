const prisma = require('../lib/prisma');

const getCommunity = async (req, res) => {
  try {
    const community = await prisma.community.findUnique({
      where: { id: req.params.id }
    });
    res.json(community);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createCommunity = async (req, res) => {
  try {
    const community = await prisma.community.create({
      data: req.body
    });
    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const joinCommunity = async (req, res) => {
  try {
    const community = await prisma.community.findUnique({
      where: { id: req.params.id }
    });
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    // Implementation for joining a community would go here
    res.json({ message: 'Successfully joined community' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCommunity, createCommunity, joinCommunity };