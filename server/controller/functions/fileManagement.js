module.exports = {
  fileUploadMulti: (req, res) => {
    console.log(req.file);
    console.log(req.body);

    res.status(200).send('등록완료 후, 작업 시작');
  }
}