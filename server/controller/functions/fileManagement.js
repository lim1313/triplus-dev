module.exports = {
  fileUploadMulti: (req, res) => {
    // console.log(req);
    console.log(req.files);
    console.log(req.body.title);

    res.status(200).send('등록완료 후, 작업 시작');
  },
};
