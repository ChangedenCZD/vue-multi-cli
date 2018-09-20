const isUp = c => /[A-Z]/.test(c);

const isNum = c => /[0-9]/.test(c);

const parseClassName = modulePath => {
  modulePath = fixPath(modulePath);
  const a = modulePath.split('/');
  const b = [];
  a.forEach(item => {
    let v = '';
    for (let i = 0; i < item.length; i++) {
      const s = item.charAt(i);
      if (isNum(s) && !isNum(item.charAt(i - 1))) {
        if (i === 0) {
          b.push(s);
        } else {
          if (v) {
            b.push(v);
          }
          v = s;
        }
      } else if (isUp(s)) {
        if (v) {
          b.push(v);
        }
        v = s.toLowerCase();
      } else {
        v += s;
      }
    }
    if (v) {
      b.push(v);
    }
  });
  return b.join('-');
};

const fixPath = modulePath => {
  modulePath = modulePath.startsWith('/') ? modulePath.substr(1) : modulePath;
  modulePath = modulePath.endsWith('/') ? modulePath.substr(0, modulePath.length - 1) : modulePath;
  return modulePath;
};

module.exports = {
  isUp, isNum, parseClassName, fixPath
};
