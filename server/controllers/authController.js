exports.login = (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json("Role required");
  }

  res.json({
    message: "Login successful",
    role: role
  });
};
