import { AES, HmacSHA512 } from "crypto-js";

//NO ESTA TOMANDO EL RSA_KEY DEL .ENV POR LO QUE MANDE LA LLAVE COMO PARAMETRO
//import { RSA_KEY } from "../../../config/config"
const NodeRSA = require("node-rsa");
class encryptConfig {
    async encriptar(thing, element) {
        var mensaje = element + "|" + thing;
        var secret = 'secret';
        var encriptado = HmacSHA512(mensaje, secret)
        return encriptado.toString();
    }
    async encryptLogin(element) {
        var secret = 'KeyDesarrollo';
        var encriptado = HmacSHA512(element, secret)
        return encriptado.toString();
    }
    async rutEncrypt(rut) {
        var secret = new Date();
        var newRut = rut + '|' + secret;
        var key = 'secret'
        newRut = AES.encrypt(newRut, key);
        return newRut.toString();
    }
    rutDecrypt(rut) {
        var split
        var aux
        var cryptoJS = require("crypto-js")
        aux = AES.decrypt(rut, 'secret');   
        split = (aux.toString(cryptoJS.enc.Utf8)).split("|")
        return split[0]
    }
    rsaEncrypt(val) {
       
        
        const RSA_KEY = process.env.REACT_APP_RSA_KEY;
        const rsakey = new NodeRSA(RSA_KEY);
        return rsakey.encrypt(val, "base64");
    }
    RSALogin(email, pass) {
        
        let val =email +'|' + pass
      //ACA SE ESTA INDEFINIENDO
        val = this.rsaEncrypt(val)
        
        return val
    } 
}
export default new encryptConfig();

