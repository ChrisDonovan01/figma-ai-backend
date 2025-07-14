module.exports = (req, res) => {
  console.log("Root endpoint accessed.");
  res.end("Root endpoint is working!");
};