class EncodeDecode {

  static encode(data) {
    let encodedData = '';
    if(!!data) {
      const isObject = data => data && data.constructor && data.constructor === Object;
      encodedData = !!isObject ? btoa(data) : '';
    }
    return encodedData;
  }

  static decode(data) {
    let decodedData = '';
    decodedData = !!data ? atob(data) : '';
    return decodedData;
  }
}

export default EncodeDecode;
