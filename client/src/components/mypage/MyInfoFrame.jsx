import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
// import { postNickName } from '../../network/my/http';
import { ColorBtn } from '../../styles/common';

export const LiWrapper = styled.li`
  z-index: 2;
  flex-grow: 1;
  flex-basis: ${({ user }) => user && '50%'};

  & .title {
    color: ${({ theme }) => theme.color.gray};
    font-size: 1rem;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChangeInput = styled.input.attrs({ type: 'text', maxLength: '8' })`
  width: ${({ user }) => (user ? '70%' : '80%')};
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 0.7em;
`;

export const UserInfo = ({ title, content, marginRight, noBtn, user }) => {
  const [isChange, setIsChange] = useState(false);
  const [inputValue, onChange] = useInput(content);

  const changeContent = (e) => {
    if (isChange) {
      if (!inputValue.length) return;

      // TODO POST /개인정보 변경
      // postNickName(inputValue,title).then(() => {
      //   setIsChange(!isChange);
      // });

      setIsChange(!isChange);
    } else {
      setIsChange(!isChange);
    }
  };

  return (
    <LiWrapper marginRight={marginRight} user={user}>
      <div className='title'>{title}</div>
      <NameWrapper>
        {isChange ? (
          <ChangeInput user={user} value={inputValue} onChange={onChange} />
        ) : (
          <div>{inputValue}</div>
        )}
        {noBtn || (
          <BtnColor palette='blue' onClick={changeContent}>
            {isChange ? '완료' : '수정'}
          </BtnColor>
        )}
      </NameWrapper>
    </LiWrapper>
  );
};

// function e(e) {
//   return e && 'object' == typeof e && 'default' in e ? e.default : e;
// }
// var t = e(require('short-uuid')),
//   r = e(require('crypto-js')),
//   i = new Date(+new Date() + 864e5).toISOString(),
//   n = i.split('-').join('').split(':').join('').split('.').join(''),
//   o = i.split('T')[0].split('-').join(''),
//   a = function () {};
// a.getPolicy = function (e) {
//   return new Buffer(
//     JSON.stringify({
//       expiration: i,
//       conditions: [
//         { acl: 'public-read' },
//         { bucket: e.bucketName },
//         ['starts-with', '$key', e.dirName ? e.dirName + '/' : ''],
//         ['starts-with', '$Content-Type', ''],
//         ['starts-with', '$x-amz-meta-tag', ''],
//         { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
//         { 'x-amz-credential': e.accessKeyId + '/' + o + '/' + e.region + '/s3/aws4_request' },
//         { 'x-amz-date': n },
//         { 'x-amz-meta-uuid': '14365123651274' },
//         { 'x-amz-server-side-encryption': 'AES256' },
//       ],
//     })
//   )
//     .toString('base64')
//     .replace(/\n|\r/, '');
// };
// var c = function () {};
// c.getSignature = function (e, t, i) {
//   var n, o, a, c, s, u;
//   return r
//     .HmacSHA256(
//       i,
//       ((n = e.secretAccessKey),
//       (o = t),
//       (a = e.region),
//       (c = r.HmacSHA256(o, 'AWS4' + n)),
//       (s = r.HmacSHA256(a, c)),
//       (u = r.HmacSHA256('s3', s)),
//       r.HmacSHA256('aws4_request', u))
//     )
//     .toString(r.enc.Hex);
// };
// var s = function (e) {
//   this.config = e;
// };
// (s.prototype.uploadFile = function (e, t) {
//   try {
//     var r = this;
//     !(function (e, t) {
//       if (null === e.bucketName || '' === e.bucketName)
//         throw new Error('Your bucketName cannot be empty ');
//       if (null === e.region || '' === e.region)
//         throw new Error('Must provide a valide region in order to use your bucket');
//       if (null === e.accessKeyId || '' === e.accessKeyId)
//         throw new Error('Must provide accessKeyId');
//       if (null === e.secretAccessKey || '' === e.secretAccessKey)
//         throw new Error('Must provide secretAccessKey');
//       if (!t) throw new Error('File cannot be empty');
//     })(r.config, e);
//     var i = new FormData(),
//       s = r.getFileNameWithExtension(e, t),
//       u = (r.config.dirName ? r.config.dirName + '/' : '') + s,
//       m =
//         (p = r.config).s3Url && '' !== p.s3Url
//           ? p.s3Url
//           : (function (e) {
//               var t = e.bucketName,
//                 r = e.region,
//                 i = r.split('-')[0];
//               switch (i) {
//                 case 'cn':
//                   return 'https://' + t + '.s3.' + r + '.amazonaws.com.' + i;
//                 default:
//                   return 'https://' + t + '.s3-' + r + '.amazonaws.com';
//               }
//             })(p);
//     return (
//       i.append('key', u),
//       i.append('acl', 'public-read'),
//       i.append('Content-Type', e.type),
//       i.append('x-amz-meta-uuid', '14365123651274'),
//       i.append('x-amz-server-side-encryption', 'AES256'),
//       i.append(
//         'X-Amz-Credential',
//         r.config.accessKeyId + '/' + o + '/' + r.config.region + '/s3/aws4_request'
//       ),
//       i.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256'),
//       i.append('X-Amz-Date', n),
//       i.append('x-amz-meta-tag', ''),
//       i.append('Policy', a.getPolicy(r.config)),
//       i.append('X-Amz-Signature', c.getSignature(r.config, o, a.getPolicy(r.config))),
//       i.append('file', e),
//       Promise.resolve(fetch(m, { method: 'post', body: i })).then(function (e) {
//         return e.ok
//           ? Promise.resolve({
//               bucket: r.config.bucketName,
//               key: (r.config.dirName ? r.config.dirName + '/' : '') + s,
//               location: m + '/' + (r.config.dirName ? r.config.dirName + '/' : '') + s,
//               status: e.status,
//             })
//           : Promise.reject(e);
//       })
//     );
//   } catch (e) {
//     return Promise.reject(e);
//   }
//   var p;
// }),
//   (s.prototype.deleteFile = function (e) {
//     try {
//       return Promise.resolve(
//         fetch(
//           'https://' +
//             this.config.bucketName +
//             '.s3' +
//             (this.config.region ? '-' + this.config.region : '') +
//             '.amazonaws.com/' +
//             (this.config.dirName ? this.config.dirName + '/' : '') +
//             e,
//           { method: 'delete' }
//         )
//       ).then(function (t) {
//         return t.ok
//           ? Promise.resolve({ ok: t.ok, status: t.status, message: 'File Deleted', fileName: e })
//           : Promise.reject(t);
//       });
//     } catch (e) {
//       return Promise.reject(e);
//     }
//   }),
//   (s.prototype.getFileNameWithExtension = function (e, r) {
//     return r && r.includes('.') ? r : (r || t.generate()) + '.' + e.type.split('/')[1];
//   }),
//   (module.exports = s);
// //# sourceMappingURL=react-aws-s3.js.map
