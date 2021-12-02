module.exports = {
  fileUploadMulti: (req, res) => {
    console.log(req.file);
    console.log(req.body);

    res.status(200).send('오나');
  }
}