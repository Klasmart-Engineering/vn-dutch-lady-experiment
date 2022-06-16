import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";


const firebaseDevConfig = {
	apiKey: "AIzaSyAO4zK6-nWMjX7jBSEVpsf3Na2r3IJuVTM",
	authDomain: "stm-dev-5dfbd.firebaseapp.com",
	projectId: "stm-dev-5dfbd",
	storageBucket: "stm-dev-5dfbd.appspot.com",
	messagingSenderId: "262647663020",
	appId: "1:262647663020:web:ad23221e490519e0115209",
	measurementId: "G-WL1FDTF4H2"
};


const firebaseAlphaConfig = {
	apiKey: "AIzaSyAQQr5ike6IilqgKqVcivDGKzL4-ZifiPg",
	authDomain: "kidsloop-alpha.firebaseapp.com",
	projectId: "kidsloop-alpha",
	storageBucket: "kidsloop-alpha.appspot.com",
	messagingSenderId: "280802827099",
	appId: "1:280802827099:web:a84819be19d6cc6b4f987e",
	measurementId: "G-9YWGG3QZY7"
};

// to replace 
const firebaseProductionConfig = {
	apiKey: "AIzaSyAQQr5ike6IilqgKqVcivDGKzL4-ZifiPg",
	authDomain: "kidsloop-alpha.firebaseapp.com",
	projectId: "kidsloop-alpha",
	storageBucket: "kidsloop-alpha.appspot.com",
	messagingSenderId: "280802827099",
	appId: "1:280802827099:web:a84819be19d6cc6b4f987e",
	measurementId: "G-9YWGG3QZY7"
};

const getFirebaseConfig = () => {
	switch (process.env.NODE_ENV) {
		case "production":
			return firebaseProductionConfig;
		case "alpha":
			return firebaseAlphaConfig;
		default:
			return firebaseDevConfig;
	}
}


const app = initializeApp(getFirebaseConfig());

class Firebase{
	private analytics: Analytics;
    constructor(app: FirebaseApp){
        this.analytics = getAnalytics(app);
    }
    logEvent( eventName: string, eventParams?: Object ){
        logEvent(this.analytics, eventName, eventParams);
    }
}

export default new Firebase(app)