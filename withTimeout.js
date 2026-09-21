// Race a promise against a timeout so a hanging network call on a legacy
// browser (Chrome 56 / Android 7.1.2) cannot freeze the UI forever. On
// timeout it rejects, so the caller's try/catch can fall back to defaults.
export function withTimeout(promise, ms, label) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () {
      reject(new Error((label || 'Operation') + ' timed out after ' + ms + 'ms'));
    }, ms);
    Promise.resolve(promise).then(
      function (val) { clearTimeout(timer); resolve(val); },
      function (err) { clearTimeout(timer); reject(err); }
    );
  });
}