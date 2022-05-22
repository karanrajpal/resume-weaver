import React from 'react';
import Arweave from 'arweave';
import Dropzone from 'react-dropzone';
import '../../styles/arweave.scss';

const DropzoneComponent = () => {
    return <Dropzone onDrop={async (acceptedFiles) => {
        const file = await acceptedFiles[0].text();
        await login(JSON.parse(file));
    }}>
        {({ getRootProps, getInputProps, acceptedFiles }) => {
            const files = acceptedFiles.map(file => <li key={file.name}>{file.name}</li>);
            return (<section>
                <div {...getRootProps({ className: 'key-dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop your key file, or click to upload</p>
                </div>
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>
            </section>
            )
        }}
    </Dropzone>
};

const login = async (keyFile: any) => {
    // Since v1.5.1 you're now able to call the init function for the web version without options. The current URL path will be used by default. This is recommended when running from a gateway.
    const arweave = Arweave.init({
        host: 'localhost',
        port: '1984',
        protocol: 'http',
    });

    const newWalletKey = await arweave.wallets.generate();
    console.log(newWalletKey);

    // keyFile = await arweave.wallets.generate();

    // Overriding with fake generated wallet
    keyFile = {
        "kty": "RSA",
        "e": "AQAB",
        "n": "ty_b_Sr9rXKWfUvdhi5oFl6xeaWMRMuvuNbg4jfnIfkxc2G9BoaIWHmger_ImpdZln1GCCM8JTv1Pyr7JCXTVUyTkVOxsYGSeSlREqmmtuQHu45tZGuzFVjZH0cQ88-m8V4vqaIVwFRJSXIipDpq-Tvjvn37W-Fj_iIC_DRcFw8ejEzfad4dm6V_6wOAL4tcZodQgjcpUNYHaF5jk1ROP1_i9t_AOhwzHc-nLxcXRo0xd_hE2Q571lg2Ac-mhrx_zZfeyTrWbzDAM_YH1MTxLzU3Iq8zoxyMRFsRdGpJnEirOVTX3KCTtvcnV-ANueDY7Oi1cIsduxHZeV73BQ-yAq0v6hNWVY0B9rITVHPFWWaoNS3zgAoEIdosCacIeXPKwR8y6FQ9Tgj9hDeJpkX338SgM6HJ2fS_u11wHEgGosNhBYGblaX8BI-qzYHdqeHiGIzRcDnrRX4lYJufm6gJgGm_jFEzSTNh6U8M1LToRc5c0xU-EHD8JXNS4W7mDC9kEWd7pDZ2SsbNs_-PZF0QTN4DV9vb5b7hCUTIx-hlSgNYv7p-3FzhxfpjVfb-fQdlIFgaOR3NqbTV6QASalI_IE6bMe93fELPTkDCfYH9P6rldi-dWu6jZD-NGeDSuzsTjs_i_sBRqljnAsxrGgqfdk4kYJ_wIrW3Gtv69TeBTak",
        "d": "GbVkRM_7QRPTTetPQA0UO4t3kdBrcp45X5H8hpL845Yy2_QMELXhvbT4EjIHJ7b08jtLkEnNn5YeEYrpKwYJ9i8kiKE7z2MVWN61C472oDU5ZpeS_6RjwiuxcQPKu8TZM4eZ3c8rCU5q6J1VgkHWkHrYt_u7QoZLv7crPxTkFbJgAaWqNxPeiOD9plBb9ZAz3AnCgTvXlwoqiPmyNNOAlcFRu37kXeNmQxlI58FwWUzoc-NKWkH_nDHOBowLXV5n-0UEla4luP4ZA1HUgIZRKORpg_sdnpcbkl5LgVCHWyERsp6XGtYIVQWzplAB7SPCneD80bocZowXPsLWnQW6YAv3gAYhxthSgsA1qgBOjEwJlD57Rfbf3D887LkQ5Zezzl_B37-ZzffxM7C1htkGZ3bnv8BRY-y63J15W1DuK9fhuWGHVwia05oWoQD2rYVP03hL9-cK66swxqKsNOt1o2kwdUvxUhxMEb6xE32-SB9-p5tmIXVpUdqkjMP0NnkZdc3fK4uyKfrjcx1wxGdmaEV0ae0CRx3Q89F_g9nJaKoiTikGJjrmVAyRGkFi6K9BukHwpCU4tcZ6NBDxJkx9cLQomaw-M-Ojt2u5Azl-DgW__2Ko8P-AJNbzBzB94Nfncf1OguYn-BCqvI-d43kdpxy7bYPZQvC_rd91wS5Yzq8",
        "p": "4BEisp0_4LTfM4dyJ_NemHzKyuqrs9nMYpbJl_lBpkEreeGXqkFpfrYwY_4VdmxZoVkfy321jxpx8hN1EGNT-iwoqg-zGRPG-xlHMvFs7WnQnUeGJ7cQCu71gF97wxYfN1amX2PKXieEMNzIj8WW75_TYn2eNSRynsPdB1RBHFMqEhQIEYCscTILKcTbPJIylx4pdOKOac_9pW-c1hf8zQpkl9ICDILlJ4J5HY2SmwquAEGe2iCMPeEiI0cL9vziHvE37qvqTHt9MsfzAghUQFoDMx6uTfwHQuS_7HSRRgFfkjiZgQ_hJe8ANtOmOLHIIBwYJ7bP6LywMxz4pZgAzw",
        "q": "0UtB2ys0CWwxn72MGJ5tzDX06cpmatnEFtemA4ThXNsQwJLkGXvs8_VP2T66suzNiVLjddmSdj2OGn32RVUZ--rjLlbqcVsTkVx1DIG0iuMc1PWVUTz4cxMvklrl4mb9h4dZP4vxEqbnPzQQdtyEpxPA498b5IG6GI8W30E7FRJoyue7A_-iOsrS00L2V210DucXWB57Tf6zA_Gaey-TnbycXkzY8uAx3UUf2_SYQPL9E0fdgBfbc7NBU5UZpS2j_7nYsMp0APFouMuvPXfgYrWAheL0XtK_FYRJ_c0yaS9bbwdP-j9Cxc-MK4-Lj-AsuoynLgofmbSNAKMSoBQ4Bw",
        "dp": "04JZZpHZwpv6NgIdWGj7WqYyJ-ntuxBVRptgIP1BY1cRWzQAns6wbtQ8SaeHSwpscUpYIRbBVBx6gzCqyJV6qCUXHbFENt_cbRsngoczc8j3DACAOu0rT6bSSCPaCAXR4cMBufnRBZ_3wMgo6s5x9DDCsa4ysad-KzBobIq0C7DVfcs68oqsPQ4oS31wFnVLHCt0pslV9bxIiuoY-mAaWtL8sfOjy3ukJO-ctLD3OzORnNxUv0MKHz9toi9ms_dy3BKH4dyWhyvquwzT7489OKG_c3n6v9KwaAzWvrYqjBKvzK9w98utlMlPQnH37nyjlOvwQUzoZaH4Ece_T1F1MQ",
        "dq": "A3SUn8O01jr9DsAYYgerlGWHp5x52GXEAQSKbyBwgBH10tgZ__m1zclNCi8o8e9K7Wt66eUvr9gQUoul1zsydKBKI-e3cyunxQybuhsiGfDp9vIfBvpUt8GnVWk-xmAg623moU_0KPSseLSpWO0HG6MN2jVCxqEFq4YhQIpZKV3mcQMmaUh9Ky9SD77ZRlQ-SEi0b_YA3ybHWddRT5tXepE0m7H1Gv1slVSg1AbTxK6-UuUq2QSL0PsypuidRcbdIEm3NCQDikhyDCsAt6kVAUwx1QQMOMyN7xMCDbinjmkDv2-FeII23gExNT7ndPakhmfwEqiEIQuEEHCgzBfJXQ",
        "qi": "0ZTSwJ63JgEl1-H3N1RfvocwO7xNEeJmyILSUH6zbWaPTkGqxOqqgkMly9bDGLQZZYlX92r2kqdnypPLPHk3530XcjKk8xs5x1uOZxwsSJwM6w0jfzsTkDdbC9Bp2f5yIFz9cOo1f5Vy6y7sJcIz2ZwDVn91HlW8QX8DW0C1YyZVe4KQjmwMaPj_wXM8akyq_I3E54VHLAWEOJFpVSaqUzWOmAYj9UVL-SGPL0wr2kfitITu91TBgWM6NG9_R484ZRWb7Tv85a9aBGCm1H1bi1bc4msWun5V9yxZISDlhG4Hjuj86EL8C_5sG90sVw3yv5FIAvxm9teDoTHiOIU4aA"
    };

    // const arweave = Arweave.init({});

    const address = await arweave.wallets.jwkToAddress(keyFile);
    const balance = await arweave.wallets.getBalance(address);
    let ar = arweave.ar.winstonToAr(balance);
    console.log(ar);

    // Plain text
    let transactionA = await arweave.createTransaction({
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, keyFile);
    console.log(transactionA);
    await arweave.transactions.sign(transactionA, keyFile);
    const response = await arweave.transactions.post(transactionA);
    console.log(response.status);

    // Get the base64url encoded string
    arweave.transactions.getData('bNbA3TEQVL60xlgCcqdz4ZPHFZ711cZ3hmkpGttDt_U').then(data => {
        console.log(data);
        // CjwhRE9DVFlQRSBodG1sPgo...
    });
};

const test = async () => {
    console.log('Started....');
    // arweave.network.getInfo().then(console.log);

    // const newWalletKey = await arweave.wallets.generate();
    // console.log(newWalletKey);
    // const address = await arweave.wallets.jwkToAddress(newWalletKey);

    // const balance = await arweave.wallets.getBalance(address);
    // let winston = balance;
    // let ar = arweave.ar.winstonToAr(balance);

    // console.log(winston);
    // //125213858712

    // console.log(ar);
    // //0.125213858712

    // Plain text
    // let transactionA = await arweave.createTransaction({
    //     data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    // });
    // console.log(transactionA);

    // await arweave.transactions.sign(transactionA, "use_wallet");



    arweave.wallets.getLastTransactionID('1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY').then((transactionId) => {
        console.log(transactionId);
    });
}

export const Save = () => {
    // test();
    return <div>
        <span>Arweave testing</span>
        <DropzoneComponent />
    </div>
};
