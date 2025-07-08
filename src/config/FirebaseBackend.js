import admin from "firebase-admin"
import { getFirestore } from "firebase/firestore"

if (!admin.apps.length) {
    const serviceAccount = require("../config/servicefile.json")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        

    });
}

export default { admin, getFirestore };
