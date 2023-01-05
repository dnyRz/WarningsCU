
import RNFS from 'react-native-fs';

const encodeImage = async (url) => {
    console.log("Encode image")
    let encode

    await RNFS.readFile(url, 'base64')
        .then(res => {
            encode = res
        });

    return encode
}

export { encodeImage }