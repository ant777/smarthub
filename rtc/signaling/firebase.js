import { FIREBASE_API_KEY } from "../../config";

export class FirebaseSignaling {

    static serviceName = 'rtcSignaling';
    constructor() {
        super();
    }

    isHostOnline = false;

    start() {
        // Initialize Firebase
        var config = {
            apiKey: FIREBASE_API_KEY,
            authDomain: "hyyyy-604e1.firebaseapp.com",
            projectId: "hyyyy-604e1",
            storageBucket: "hyyyy-604e1.appspot.com",
            messagingSenderId: "83043821010",
            appId: "1:83043821010:web:65acc49b2c287f11cf540b"
        };
        try {

            // firebase.initializeApp(config);
            // this.firestore = firebase.firestore();
            // this.setup();
        } catch(e){

        }
    }

    setup() {
        const callDoc = this.firestore.collection('rooms').doc('test');
        //
        // const answerCandidates = callDoc.collection('answerCandidates');
        // const offerCandidates = callDoc.collection('offerCandidates');
        this.firestore.collection('rooms').where('created', '>', firebase.firestore.Timestamp.fromDate(new Date())).onSnapshot(snapshot => {

            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    this.offerDocId = change.doc.id;
                    const callDoc = this.firestore.collection('rooms').doc(change.doc.id);
                    let data = change.doc.data();
                    this.onMessage && this.onMessage(data);
                    if (this.sentDocId !== this.offerDocId) {
                        this.emit({
                            signalType: 'offerAdded',
                            data
                        });
                    }
                }
                if (change.type === 'modified') {
                    this.__.isHostOnline = change.doc.data().state==='online';
                }
            })
        })
    }

    async sendOffer(offer, extraPayload = {}) {
        const callDoc = this.firestore.collection('rooms').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
        this.sentDocId = callDoc.id;
        this.iceCandidates = offerCandidates;
        const pcId = extraPayload.pcId || callDoc.id;
        await callDoc.set({ pcId: callDoc.id, ...extraPayload, offer: {type: offer.type, sdp: offer.sdp}, created: firebase.firestore.FieldValue.serverTimestamp() });
        // const roomRef = await this.firestore.collection('rooms').add(roomWithOffer);
        // const roomId = roomRef.id;


        answerCandidates.onSnapshot(async snapshot => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    this.emit({
                        signalType: 'iceCandidateAdded',
                        data: {
                            candidate: change.doc.data(),
                            pcId
                        }
                    });
                    this.onIceCandidate(change.doc.data());
                }
            });
        });
        callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data();
            if (data && data.answer) {
                if (data && data.answer) {
                    this.emit({
                        signalType: 'answerAdded',
                        data: {
                            ...data,
                            pcId
                        },
                    });
                }
            }
        });
        return callDoc.id;
    }

    async sendStatus() {
        if (this.offerDocId) {
            const callDoc = this.firestore.collection('rooms').doc(this.offerDocId);
            await callDoc.update({state: 'online'});
        }
    }

    async sendAnswer(answerObj) {
        if (this.offerDocId) {
            const callDoc = this.firestore.collection('rooms').doc(this.offerDocId);
            this.sentDocId = callDoc.id;
            const answerCandidates = callDoc.collection('answerCandidates');
            const offerCandidates = callDoc.collection('offerCandidates');
            this.iceCandidates = answerCandidates;
            const answer = {
                type: answerObj.type,
                sdp: answerObj.sdp,
            };

            await callDoc.update({ answer });
            // Listen for remote ICE candidates
            const docSnap = await callDoc.get({
                source: 'cache'
            });
            offerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        this.emit({
                            signalType: 'iceCandidateAdded',
                            data: {
                                candidate: change.doc.data(),
                                pcId: docSnap.data().pcId
                            }
                        });
                        this.onIceCandidate(change.doc.data())
                    }
                });
            });
        }
    }

    async dispose(){
        const refDoc = await this.firestore.collection('rooms').doc(this.offerDocId).delete();
    }

    addIceCandidate(iceCandidate){
        //this.iceCandidates.add(iceCandidate.toJSON());
    }

    onMessage(handler) {
    }

    onIceCandidate(iceCandidate) {
    }
}